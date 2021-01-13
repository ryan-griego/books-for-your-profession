import React from 'react';
import Search from './search';
import BookList from './book-list';
import BookDetails from './book-details';
import TopNavBar from './top-nav-bar';
import ChooseUser from './choose-user';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedItem: '',
      userProfession: '',
      books: [],
      message: null,
      statusMessage: '',
      loginStatus: false,
      isLoading: true,
      view: {
        name: 'search',
        searchType: 'profession',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.resetState = this.resetState.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
    this.updateSearchedProfession = this.updateSearchedProfession.bind(this);

    this.getProfessionBooks = this.getProfessionBooks.bind(this);
    this.getGoogleBooks = this.getGoogleBooks.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.addBookToList = this.addBookToList.bind(this);
    this.deleteBookFromList = this.deleteBookFromList.bind(this);
  }

  chooseUser(userId) {
    fetch(`/api/users/login/${userId}`)
      .then(response => {
        if (response.status === 200) {
          this.updateLoginStatus(true);
          this.setView('search', 'profession', {});
          return response.json();
        }
        if (response.status === 404) {
          this.setState({ message: 'Email address and/or password is incorrect. Please try again.' });
        }
      })
      .then(data => {
        this.setState({ userProfession: data.professionName });
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  getUserLogin(email, password) {
    fetch(`/api/users/login/${email}/${password}`)
      .then(response => {
        if (response.status === 200) {
          this.updateLoginStatus(true);
          this.setView('search', 'profession', {});
        }
        if (response.status === 404) {
          this.setState({ message: 'Email address and/or password is incorrect. Please try again.' });
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  logUserOut() {
    fetch('/api/users/logout/')
      .then(response => {
        this.setState({ loginStatus: false });
        this.setView('bookList', 'profession', {});
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  getProfessionBooks() {
    const search = this.state.view.params.currentProfession === undefined ? this.state.searchedItem : this.state.view.params.currentProfession;
    this.setState({ searchedItem: search });
    fetch(`/api/books/${search}`)
      .then(response => {
        if (response.status === 404) {
          this.setState({ message: 'There is no list associated with that profession' });
          this.setState({ statusMessage: 'no books for profession' });
        }
        return response.json();
      })
      .then(data => {
        this.setState({ books: data });
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  resetState() {
    this.setState({ books: [] });
  }

  updateLoginStatus(status) {
    this.setState({ loginStatus: status });
  }

  updateSearchedProfession(profession) {
    this.setView('bookList', 'profession', profession);
  }

  getGoogleBooks() {
    const bookTitle = this.state.view.params.book ? this.state.view.params.book : this.state.searchedItem;
    this.setState({ books: [] });
    const book = encodeURIComponent(bookTitle);
    const unencodedBook = decodeURIComponent(bookTitle);
    this.setState({ searchedItem: unencodedBook });
    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + book)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        if (result.totalItems === 0) {
          that.setState({ message: 'There are no books with that title' });
          return;
        }
        that.setState({ books: [...result.items] });
      }),
    function (error) {
      console.log(error);
    };
  }

  getUserList() {
    fetch('/api/books/users/:userid')
      .then(response => {
        if (response.status === 404) {
          this.setState({ statusMessage: 'There are currently no books in the list. You can add books to your list after conducting a book search.' });
          const Msg = ({ closeToast }) => (
            <div>
              {this.state.statusMessage}
            </div>
          );
          const notify = () => toast.error(<Msg />);
          notify();
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then(data => {
        if (data.error) {
          console.log('There was an error retrieving the logged in users book list.');
        } else {
          this.setView('bookList', 'user', {});

          this.setState({ books: data });
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  addBookToList(book) {
    if (this.state.view.searchType === 'book') {
      book = this.state.view.params;
      const checkImage = book.bookObject.volumeInfo.imageLinks ? book.bookObject.volumeInfo.imageLinks.thumbnail : 'images/no-image-available.png';
      const checkAuthor = book.bookObject.volumeInfo.authors ? book.bookObject.volumeInfo.authors : '';
      const checkGenre = book.bookObject.volumeInfo.categories ? book.bookObject.volumeInfo.categories[0] : 'No genre listed';
      const checkReleaseYear = book.bookObject.volumeInfo.publishedDate ? book.bookObject.volumeInfo.publishedDate.slice(0, 4) : 0;
      const clickedBook = {
        name: book.bookObject.volumeInfo.title,
        imageurl: checkImage,
        author: checkAuthor,
        genre: checkGenre,
        link: book.bookObject.selfLink,
        releaseYear: checkReleaseYear,
        shortDescription: book.bookObject.volumeInfo.description,
        favorites: 1
      };

      fetch('api/book-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clickedBook)
      })
        .then(response => {
          response.json();
          if (response.status === 200) {
            this.setState({ statusMessage: 'Book added' });
            setTimeout(
              () => this.setView('bookList', 'user', {}),
              500
            );
            this.setState({ statusMessage: '' });
          } else if (response.status === 404) {
            this.setState({ statusMessage: 'This book already exists in your list.' });
            const Msg = ({ closeToast }) => (
              <div>
                {this.state.statusMessage}
              </div>
            );
            const notify = () => toast.error(<Msg />);
            notify();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (this.state.view.searchType === 'profession') {
      const clickedBook = this.state.view.params.clickedBook[0];
      fetch('api/book-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clickedBook)
      })
        .then(response => {
          response.json();
          if (response.status === 200) {
            this.setState({ statusMessage: 'Book added' });
            setTimeout(
              () => this.setView('bookList', 'user', {}),
              500
            );
            this.setState({ statusMessage: '' });
          } else if (response.status === 404) {
            this.setState({ statusMessage: 'This book already exists in your list.' });
            const Msg = ({ closeToast }) => (
              <div>
                {this.state.statusMessage}
              </div>
            );
            const notify = () => toast.error(<Msg />);
            notify();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  deleteBookFromList(book) {
    book = parseInt(this.state.view.params.bookId);
    fetch(`api/book-list/${book}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.json();
        if (response.status === 200) {
          this.setState({ statusMessage: 'Book deleted' });
          if (this.state.books[0] && !this.state.books[1]) {
            this.setState({ books: [] });
            this.setView('search', 'book', {});
          } else {
            setTimeout(
              () => this.setView('bookList', 'user', {}),
              500
            );
          }
          this.setState({ statusMessage: '' });
        } else if (response.status === 404) {
          this.setState({ statusMessage: 'There was a 404 error.' });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  setView(name, searchType, params) {
    this.setState({
      view: {
        name: name,
        searchType: searchType,
        params: params
      }
    });
  }

  checkLogStatusOnLoad() {
    fetch('/api/users/logcheck')
      .then(response => {
        if (response.status === 400) {
          this.setState({ loginStatus: false });
        } else if (response.status === 200) {
          this.setState({ loginStatus: true });
          return response.json();
        }
      })
      .then(data => {
        this.setState({ userProfession: data.professionName });
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  componentDidMount() {
    this.checkLogStatusOnLoad();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const viewType = this.state.view.name;
    if (viewType === 'bookList') {
      return <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <TopNavBar
          bookList={this.state.books}
          view={this.setView}
          viewParams={this.state.view.params}
          searchType={this.state.view.searchType}
          getUserList={this.getUserList}
          message={this.state.statusMessage}
          resetState={this.resetState}
          logout={this.logUserOut}
          loginStatus={this.state.loginStatus}
          updateLoginStatus={this.updateLoginStatus}
        />
        <BookList
          bookList={this.state.books}
          view={this.setView}
          viewParams={this.state.view.params}
          searchedItem={this.state.searchedItem}
          userProfession={this.state.userProfession}
          searchType={this.state.view.searchType}
          message={this.state.statusMessage}
          getProfessionBooks={this.getProfessionBooks}
          getGoogleBooks={this.getGoogleBooks}
          getUserList={this.getUserList}
        />
        <Footer
          searchType={this.state.view.searchType} />
      </>;
    } else if (viewType === 'search') {
      return <>
        <TopNavBar
          bookList={this.state.books}
          view={this.setView}
          viewParams={this.state.view.params}
          searchType={this.state.view.searchType}
          getUserList={this.getUserList}
          message={this.state.statusMessage}
          resetState={this.resetState}
          logout={this.logUserOut}
          loginStatus={this.state.loginStatus}
          updateLoginStatus={this.updateLoginStatus}
        />
        <Search
          view={this.setView}
          viewParams={this.state.view.params}
          searchType={this.state.view.searchType}
          getProfessionBooks={this.getProfessionBooks}
          statusMessage={this.state.statusMessage}
          getGoogleBooks={this.getGoogleBooks}
          searchedItem={this.state.searchedItem}
        />
        <Footer
          searchType={this.state.view.searchType} />
      </>;
    } else if (viewType === 'bookDetails') {
      return <><TopNavBar
        bookList={this.state.books}
        view={this.setView}
        viewParams={this.state.view.params}
        searchType={this.state.view.searchType}
        getUserList={this.getUserList}
        message={this.state.statusMessage}
        resetState={this.resetState}
        logout={this.logUserOut}
        loginStatus={this.state.loginStatus}
        updateLoginStatus={this.updateLoginStatus}
      />
      <BookDetails
        view={this.setView}
        viewParams={this.state.view.params}
        searchType={this.state.view.searchType}
        add={this.addBookToList}
        searchedItem={this.state.searchedItem}
        loginStatus={this.state.loginStatus}
        getProfessionBooks={this.getProfessionBooks}
        currentProfession={this.state.view.params.currentProfession}
        updateSearchedProfession={this.updateSearchedProfession}
        message={this.state.statusMessage}
        delete={this.deleteBookFromList}
      />
        <Footer
          searchType={this.state.view.searchType} />
      </>;
    } else if (viewType === 'login') {
      return <><TopNavBar
        bookList={this.state.books}
        view={this.setView}
        viewParams={this.state.view.params}
        searchType={this.state.view.searchType}
        getUserList={this.getUserList}
        message={this.state.statusMessage}
        resetState={this.resetState}
        logout={this.logUserOut}
        loginStatus={this.state.loginStatus}
        updateLoginStatus={this.updateLoginStatus}
      />
      <ChooseUser
        chooseUser={this.chooseUser}
        view={this.setView}
        message={this.state.message}
        updateLoginStatus={this.updateLoginStatus}
      />
      <Footer
      searchType={this.state.view.searchType}/>
      </>;
    }
  }
}
