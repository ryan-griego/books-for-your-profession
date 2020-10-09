import React from 'react';
import SearchedBookListItem from './searched-book-list-item';

class SearchedBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []

    };

    this.setView = this.setView.bind(this);
  }

  getGoogleBooks(event) {
    // THIS WILL NEED TO BE CHANGED BACK SO USER CAN ENTER ANY BOOK TITLE
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API;
    // const book = encodeURIComponent(this.state.searchField);
    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + 'javascript' + '&key=' + apiKey + '&maxResults=5')
      .then(function (res) {
        return res.json();

      })
      .then(function (result) {
        that.setState({ books: [...result.items] });
        const description = result.items[0].volumeInfo.description;
        that.setView(event);
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {
    this.getGoogleBooks();
  }

  setView(e) {
    const bookIsbn = e.currentTarget.getAttribute('isbn');
    this.props.view('searchBookDetails', { bookIsbn });
  }

  render() {
    // need to add a screen letting the user know that there are no books with that title
    const bookCount = this.state.books.length;
    const messageCheck = bookCount <= 0 ? 'There are no books listed for the title' : '';
    // if (this.state.books.error) {
    //   // this.props.view('searchByProfession', {});
    //   return (
    //     <>
    //       <div className="container">
    //         <h2>{`There are no books or booklists in the database with the profession ${this.props.viewParams.currentProfession} linked to it`}</h2>
    //       </div>
    //     </>
    //   );

    // } else {
    return (
      <>
        <div className="container">
          <h1></h1>
          <div className="row row-cols-1 row-cols-md-2 mt-5">
            <div className="card-group">
              {messageCheck}
              {
                this.state.books.map((book, index) => {
                  return <SearchedBookListItem
                    key={index}
                    isbn={book.volumeInfo.industryIdentifiers[0].identifier}
                    id={book.id}
                    book={book.volumeInfo}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    name={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    genre={book.volumeInfo.categories}
                    releaseYear={book.volumeInfo.publishedDate}
                    shortDescription={book.volumeInfo.description}
                    view={this.setView} />;
                })
              }

            </div>
          </div>
        </div>
      </>
    );
  }

}
// }

export default SearchedBookList;
