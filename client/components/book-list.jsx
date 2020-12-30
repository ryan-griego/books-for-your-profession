import React from 'react';
import BookListItem from './book-list-item';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      message: ''
    };
    this.setView = this.setView.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
  }

  componentDidMount() {
    if (this.props.searchType === 'profession') this.props.getProfessionBooks();
    if (this.props.searchType === 'book') this.props.getGoogleBooks();
    if (this.props.searchType === 'user') this.props.getUserList();
  }

  setView(e) {
    const bookId = e.currentTarget.getAttribute('id');
    const selfLink = e.currentTarget.getAttribute('selflink');
    const clickedBook = this.props.bookList.filter(book => {
      return book.bookId === parseInt(bookId);
    });
    if (this.props.searchType === 'profession') {
      this.props.view('bookDetails', this.props.searchType, { clickedBook });
    }
    if (this.props.searchType === 'book') this.props.view('bookDetails', this.props.searchType, { selfLink });
    if (this.props.searchType === 'user') this.props.view('bookDetails', this.props.searchType, { bookId });
  }

  backToSearch() {
    this.props.view('search', this.props.searchType, {});
  }

  checkList() {
    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      return (
        this.props.bookList.map((book, index) => {
          return <BookListItem
            searchType={this.props.searchType}
            key={index}
            book={book}
            rank={index + 1}
            image={book.imageurl}
            name={book.name}
            link={book.link}
            author={book.author}
            genre={book.genre}
            releaseYear={book.releaseYear}
            shortDescription={book.shortDescription}
            bookId={book.bookId}
            view={this.setView} />;
        })
      );
    }

    if (this.props.searchType === 'book') {
      return (
        this.props.bookList.map((book, index) => {
          const titleCount = 120;
          const authCount = 2;
          const checkImage = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'images/library-books.jpg';
          const checkTitleLength = book.volumeInfo.title.length > titleCount ? book.volumeInfo.title.slice(0, titleCount) + ' [...]' : book.volumeInfo.title;
          const checkAuthorLength = book.volumeInfo.authors ? book.volumeInfo.authors.slice(0, authCount) : book.volumeInfo.authors;
          return <BookListItem
            searchType={this.props.searchType}
            key={index}
            id={book.id}
            book={book.volumeInfo}
            image={checkImage}
            link={book.selfLink}
            name={checkTitleLength}
            author={checkAuthorLength}
            genre={book.volumeInfo.categories}
            releaseYear={book.volumeInfo.publishedDate}
            shortDescription={book.volumeInfo.description}
            view={this.setView} />;
        })
      );
    }
  }

  backSearch() {
    if (this.props.searchType === 'book' || this.props.searchType === 'profession') {
      return (
        <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.backToSearch} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>
      );
    }
  }

  checkSearch() {
    const listCount = this.props.bookList.length;
    if (this.props.searchType === 'user') {
      return (
        <h1 className="results ml-3 fadeIn third" style={{ textTransform: 'capitalize' }}>Your top ranked <span>{this.props.userProfession}</span> books</h1>
      );
    } if (this.props.searchType === 'profession') {
      return (
        <h1 className="results ml-3 fadeIn third" style={{ textTransform: 'capitalize' }}>Top ranked books for <span>{this.props.searchedItem}</span> </h1>
      );
    } if (this.props.searchType === 'book') {
      return (
        <h1 className="results ml-3 fadeIn third" style={{ textTransform: 'capitalize' }}>{listCount} results for<span> &quot;{this.props.searchedItem}&quot;</span></h1>
      );
    }
  }

  render() {
    return (
      <>
        <div className="container">
          {this.backSearch()}
          <div className="row row-cols-1 row-cols-md-2">
            {this.checkSearch()}
            <div className="card-group">
              {this.checkList()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BookList;
