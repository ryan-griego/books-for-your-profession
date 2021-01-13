require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

// GET request to enable user to pick user from  a drop down
app.get('/api/users/login/:userid', (req, res, next) => {
  const userId = req.params.userid;
  const user = [userId];
  const chooseUser = `
  SELECT "userId", "professionName"
  FROM "users"
  WHERE "users"."userId" = $1`;

  db.query(chooseUser, user)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: 'The user is not a valid user'
        });
      }
      req.session.userInfo = result.rows[0];
      const addUserBookListId = `
        SELECT "bookListId", "professionName"
        FROM "bookList"
        WHERE "bookList"."userId" = ${userId};
      `;
      db.query(addUserBookListId)
        .then(result => {
          req.session.userInfo.bookListId = result.rows[0].bookListId;
          res.json(result.rows[0]);
          res.status(200).send();
          return result.rows[0];
        })
        .then(result => {
          const bookListId = result.bookListId;
          const checkIfUserHasBooks = `
          SELECT "bookListItems"."bookListId"
            FROM "bookListItems"
            WHERE "bookListItems"."bookListId" = ${bookListId};
          `;
          db.query(checkIfUserHasBooks)
            .then(result => {
              if (!result.rows[0]) {
                return 'you got no books in your books list';
              }
            });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// User logs in
app.get('/api/users/login/:email/:password', (req, res, next) => {
  const email = req.params.email;
  const password = req.params.password;
  const values = [email, password];
  const checkLogin = `
  SELECT "userId", "professionName"
  FROM "users"
  WHERE LOWER("users"."email") = $1 AND "users"."password" = $2;`;
  db.query(checkLogin, values)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `The email and password ${values} is not a valid email.`
        });
      }
      const userId = result.rows[0].userId;
      req.session.userInfo = result.rows[0];
      const addUserBookListId = `
        SELECT "bookListId"
        FROM "bookList"
        WHERE "bookList"."userId" = ${userId};
      `;
      db.query(addUserBookListId)
        .then(result => {
          req.session.userInfo.bookListId = result.rows[0].bookListId;
          res.json(result.rows[0].bookListId);
          res.status(200).send();
          return result.rows[0].bookListId;
        })
        .then(result => {
          const checkIfUserHasBooks = `
          SELECT "bookListItems"."bookListId"
            FROM "bookListItems"
            WHERE "bookListItems"."bookListId" = ${result};
          `;
          db.query(checkIfUserHasBooks)
            .then(result => {
              if (!result.rows[0]) {
                return 'you got no books in your books list';
              }
            });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// User logs out
app.get('/api/users/logout', (req, res, next) => {
  if (req.session.userInfo) {
  delete req.session.userInfo;
  }
});

app.get('/api/users/logcheck', (req, res, next) => {
  if (req.session.userInfo) {
    res.send(req.session.userInfo);
  } else {
    // res.status(400).send('there is not a log in');
    return;
  }
});

app.get('/api/booklist', (req, res, next) => {
  const checkBookListId = `
    SELECT "bli"."bookListItemId",
           "bli"."bookId",
           "b"."bookId",
           "b"."name",
           "b"."author",
           "b"."shortDescription"
      FROM "bookListItems" AS "bli"
      JOIN "books" AS "b" USING ("bookId")
    WHERE "bli"."bookListId" = $1;
  `;
  if (!req.session.userId.bookListId) return res.json([]);
  const value = [req.session.userId.bookListId];
  db.query(checkBookListId, value)
    .then(result => {
      const data = result.rows;
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/books', (req, res, next) => {
  const viewAllBooks = `
  SELECT "books"
  FROM "bookList"
  JOIN "bookListItems" USING ("bookListId")
  JOIN "books" USING ("bookId")
  WHERE "bookList"."professionName" = $1
  ORDER BY "books"."favorites" DESC;`;
  db.query(viewAllBooks)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

// GET request to check if profession exists in a any book list
app.get('/api/professions/:professionName', (req, res, next) => {
  const checkProfession = `
  SELECT "bookList"."professionName", "bookList"."bookListId"
  FROM "bookList"
  WHERE LOWER("bookList"."professionName") = $1;
  `;
  const professionName = req.params.professionName;
  const params = [professionName];
  db.query(checkProfession, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `professionName: ${professionName} cannot be located.`
        });
      } else {
        const bookListId = result.rows[0].bookListId;
        const checkBookList = `
          SELECT "bookId"
          FROM "bookListItems"
          WHERE "bookListItems"."bookListId" = ${bookListId};
        `;
        db.query(checkBookList)
          .then(result => {
            if (!result.rows[0]) {
              res.status(404).json({
                error: 'There are no books with that profession list that currently exists'
              });
            }
          })
          .catch(err => next(err));
        res.json(result.rows);
      }
    }).catch(err => next(err));
});

// GET request gets all books by profession name
app.get('/api/books/:professionName', (req, res, next) => {
  const viewAllBooks = `
   SELECT "b"."bookId", "b"."imageurl", "b"."name", "b"."author", "b"."genre", "b"."releaseYear", "b"."shortDescription", "b"."favorites", "b"."link"
  FROM "bookList"
  JOIN "bookListItems" USING ("bookListId")
  JOIN "books" AS "b" USING ("bookId")
  WHERE LOWER("bookList"."professionName") = $1
  ORDER BY "b"."favorites" DESC;`;
  const professionName = req.params.professionName;
  const params = [professionName];
  db.query(viewAllBooks, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `professionName: ${professionName} cannot be located.`
        });

      } else {
        res.json(result.rows);
      }
    }).catch(err => next(err));
});

// GET endpoint that returns a single book by searching for bookId
app.get('/api/books/id/:bookId', (req, res, next) => {
  const viewSingleBook = `
  SELECT *
  FROM "books"
  WHERE "bookId" = $1
  `;
  const bookId = parseInt(req.params.bookId);
  const params = [bookId];
  db.query(viewSingleBook, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `bookId: ${bookId} cannot be located.`
        });
      } else {
        res.json(result.rows[0]);
      }
    }).catch(err => next(err));
});

// GET endpoint to get all books by userId
app.get('/api/books/users/:userid', (req, res, next) => {
  const viewAllBooksByUserId = `
   SELECT "b"."bookId", "b"."imageurl", "b"."name", "b"."author", "b"."genre", "b"."releaseYear", "b"."shortDescription", "b"."favorites", "b"."link"
  FROM "bookList"
  JOIN "bookListItems" USING ("bookListId")
  JOIN "books" as "b" USING ("bookId")
  WHERE "bookList"."userId" = $1
   ORDER BY "b"."favorites" DESC;`
    ;
  if (!req.session.userInfo.userId) return res.json([]);
  const userId = req.session.userInfo.userId;
  const params = [userId];
  db.query(viewAllBooksByUserId, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `books: no books can be located with ${userId}.`
        });
      } else {
        res.status(200).json(result.rows);
      }
    }).catch(err => next(err));
});

// POST endpoint to add a new book to the books table AND add a new row to BookListItems table
app.post('/api/book-list', (req, res, next) => {
  const { imageurl, name, author, genre, releaseYear, shortDescription, link } = req.body;
  const checkLink = `
    SELECT "link"
    FROM "books"
    WHERE "link" = $1
  `;

  const addBook = `
    insert into "books" ("bookId", "imageurl", "name", "author", "genre", "releaseYear", "shortDescription", "link", "favorites")
    values (default, $1, $2, $3, $4, $5, $6, $7, +1)
    returning "bookId";
  `;
  const bookListId = req.session.userInfo.bookListId;

  const addBookListItem = `
    insert into "bookListItems" ("bookListItemsId", "bookListId", "bookId")
    values (default, ${bookListId}, $1)
    returning *;
    `;

  const values = [imageurl, name, author, genre, releaseYear, shortDescription, link];
  const linkValue = [link];

  db.query(checkLink, linkValue)
    .then(result => {
      if (!result.rows[0]) {
        db.query(addBook, values)
          .then(result => {
            if (!result.rows[0]) {
              throw new ClientError('book cannot be added', 400);
            } else if ('userId' in req.session.userInfo) {
              return {
                bookId: result.rows[0].bookId,
                userId: req.session.userInfo.userId
              };
            }
            const userId = req.session.userInfo.userId;
            const addBookListId = `
            insert into "bookList" ("bookListId", "createdAt", "userId", "professionName")
            values (default, default, ${userId}, $1)
            returning "userId";
            `;
            return db.query(addBookListId).then(userId => ({
              bookId: result.rows[0].bookId,
              userId: userId.rows[0].userId
            }));
          })
          .then(data => {
            const bookId = data.bookId;
            const values = [bookId];
            db.query(addBookListItem, values)
              .then(result => {
                return result.rows[0];
              });
            res.status(200).json({
              message: 'You have successfully added a book to books and a book list item to book list items'
            });
          })
          .catch(err => next(err));
      } else if (result.rows[0]) {
        const bookLink = result.rows[0].link;
        const link = [bookLink];
        const getBookId = `
          SELECT "bookId"
          FROM "books"
          WHERE "books"."link" = $1
        `;
        db.query(getBookId, link)
          .then(result => {
            const bookId = result.rows[0].bookId;
            const userId = req.session.userInfo.userId;
            const values = [userId, bookId];
            const checkUserBookList = `
            SELECT "bli"."bookId"
            FROM "bookListItems" as "bli"
            JOIN "bookList" as "bl" USING ("bookListId")
            JOIN "users" as "u" USING ("userId")
            WHERE "u"."userId" = $1 AND "bli"."bookId" = $2;
             `;
            db.query(checkUserBookList, values)
              .then(result => {
                if (!result.rows[0]) {
                  const id = [values[1]];
                  db.query(addBookListItem, id)
                    .then(result => {
                      const incrementBookFavoritesId = `
                      UPDATE "books"
                      SET favorites = favorites + 1
                      WHERE "books"."bookId" = $1
                      RETURNING "books"."bookId";
                    `;
                      db.query(incrementBookFavoritesId, id)
                        .then(result => {
                          return 'You added +1 to favorites after adding a new book list item';
                        });
                      return result.rows[0];
                    });
                  res.status(200).json({
                    message: 'You have successfully added a book to books and a book list item to book list items'
                  });
                } else {
                  res.status(404).json({
                    error: 'The book exists already in the books list'
                  });
                  return result.rows[0];
                }
              });
          })
          .catch(err => next(err));
      }
    });
});

// DELETE endpoint to remove a book from a user's book list
app.delete('/api/book-list/:bookId', (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  const params = [bookId];
  const deleteBookById = `
  DELETE FROM "bookListItems" USING "bookList"
WHERE "bookList"."userId" = 1 AND "bookListItems"."bookId" = $1
RETURNING "bookListItems"."bookId";
  `;

  const decrementFavorites = `
  UPDATE "books"
  SET favorites = favorites - 1
  WHERE "books"."bookId" = $1;
  `;

  db.query(deleteBookById, params)
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'You have successfully deleted a book'
        });
        return result;
      } else {
        res.status(404).json({
          message: 'You have NOT deleted a book'
        });
      }
    })
    .then(result => {
      const bookId = result.rows[0].bookId;
      const id = [bookId];
      db.query(decrementFavorites, id)
        .then(result => {
          return result;
        }).catch(err => next(err));
    });
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
