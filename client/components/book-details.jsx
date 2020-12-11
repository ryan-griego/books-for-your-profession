import React from 'react';
import { ToastContainer } from 'react-toastify';

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      descriptionOn: false
    };
    this.setView = this.setView.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
    this.backToUserList = this.backToUserList.bind(this);
    this.backToSearchResults = this.backToSearchResults.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  getGoogleBooksByIsbn() {
    const isbn = this.props.viewParams.bookIsbn;
    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        that.setState({ book: result.items[0].volumeInfo });
        that.setView();
      }),
    function (error) {
      console.log(error);
    };
  }

  getGoogleBooksById() {
    const id = this.props.viewParams.bookId;
    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + id)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        that.setState({ book: result.items[0].volumeInfo });
        that.setView();
      }),
    function (error) {
      console.log(error);
    };
  }

  getGoogleBooksBySelfLink() {
    const selfLink = this.props.viewParams.selfLink;
    const that = this;
    fetch(`${selfLink}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        that.setState({ book: result });
        that.setView();
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {
    if (this.props.searchType === 'user') {
      fetch(`/api/books/id/${this.props.viewParams.bookId}`)
        .then(response => response.json())
        .then(data => this.setState({ book: data }))
        .catch(error => {
          console.error('There was a problem with your fetch GET operation: ', error);
        });
    }

    if (this.props.searchType === 'profession') {
      const clickedBook = this.props.viewParams.clickedBook[0].bookId;
      fetch(`/api/books/id/${clickedBook}`)
        .then(response => response.json())
        .then(data => this.setState({ book: data }))
        .catch(error => {
          console.error('There was a problem with your fetch GET operation: ', error);
        });
    }
    if (this.props.searchType === 'book') {
      this.getGoogleBooksBySelfLink();
    }
  }

  setView(e) {
    if (this.props.searchType === 'book' || this.props.searchType === 'profession') {
      const bookObject = this.state.book;
      this.props.view('bookDetails', this.props.searchType, { bookObject });
    }
  }

  backToSearch() {
    this.props.view('search', this.props.searchType, {});
  }

  backToUserList() {
    this.props.view('bookList', 'user', {});
  }

  backToSearchResults() {
    this.props.view('bookList', this.props.searchType, { });
  }

  checkDetails() {
    if (this.props.searchType === 'profession') {
      if (this.props.loginStatus) {
        return (
          <a className="btn btn-primary fadeIn third" onClick={this.props.add}>Add to my list</a>
        );
      }
    } else if (this.props.searchType === 'user') {
      return (
        <a className="btn btn-primary btn-danger fadeIn third" onClick={this.props.delete}>Delete from my list</a>
      );
    }
  }

  toggleDescription() {
    this.setState({ descriptionOn: !this.state.descriptionOn });
  }

  getRenderedDescription() {
    const count = 350;
    if (this.props.searchType === 'profession') {
      const longDescription = this.props.viewParams.clickedBook.[0].shortDescription ? this.props.viewParams.clickedBook.[0].shortDescription.replace(/(<([^>]+)>)/gi, '') : 'No description available';
      const shortDescription = longDescription.slice(0, count);
      if (longDescription.length < 350) {
        return (
          <div>
            {longDescription}
          </div>
        );
      }
      if (longDescription === 'No description available') {
        return longDescription;
      } else if (longDescription !== 'No description available') {
        if (this.state.descriptionOn) {
          return (
            <div>
              {longDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        } else {
          return (
            <div>
              {shortDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        }
      }

    } else if (this.props.searchType === 'user') {
      const longDescription = this.state.book.shortDescription ? this.state.book.shortDescription.replace(/(<([^>]+)>)/gi, '') : 'No description available';
      const shortDescription = longDescription.slice(0, count);

      if (longDescription === 'No description available' || longDescription.length < 350) {
        return longDescription;
      } else if (longDescription !== 'No description available') {
        if (this.state.descriptionOn) {
          return (
            <div>
              {longDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        } else {
          return (
            <div>
              {shortDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        }
      }
    } else if (this.props.searchType === 'book') {
      const longDescription = this.state.book.volumeInfo.description ? this.state.book.volumeInfo.description.replace(/(<([^>]+)>)/gi, '') : 'No description available';
      const shortDescription = longDescription.slice(0, count);
      if (longDescription === 'No description available' || longDescription.length < 350) {
        return longDescription;
      } else if (longDescription !== 'No description available') {
        if (this.state.descriptionOn) {
          return (
            <div>
              {longDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        } else {
          return (
            <div>
              {shortDescription}
              <a className="toggle-description-link" onClick={this.toggleDescription} style={{ cursor: 'pointer' }}>
                {this.state.descriptionOn ? 'See less' : '[ ... ] See more'}
              </a>
            </div>
          );
        }
      }
    }
  }

  render() {
    if (!this.state.book) return null;
    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      const fixAuthors = this.state.book.author.length > 1 ? this.state.book.author.replace(/{|"|}/g, '').replace(/,/g, ', ') : this.state.book.author;
      return (
        <>
          <div className="container top-container">
            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 d-flex justify-content-start back-btn" onClick={this.backToSearchResults} style={{ cursor: 'pointer' }}>&lt; Back to Search Results</div>
              <div className="details-card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src={this.state.book.imageurl} className="card-img-top-details img-thumbnail mt-2 fadeIn first"></img>
                <div className="card-body">
                  <h5 className="card-title fadeIn second">{this.state.book.name}</h5>
                  <p className="card-author fadeIn second">{fixAuthors}</p>
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
                  {this.checkDetails()}
                  <div className="row book-info mt-4">
                    <div className="col-md-6 subject fadeIn fourth">
                      <p className="text-muted text-uppercase">Subject</p>
                      <p>{this.state.book.genre}</p>
                    </div>
                    <div className="col-md-6 fadeIn fourth">
                      <p className="text-muted text-uppercase">Released</p>
                      <p>{this.state.book.releaseYear}</p>
                    </div>
                  </div>
                  <div className="card-text fadeIn fourth book-desc">
                    {this.getRenderedDescription()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.props.searchType === 'book') {
      const checkImage = this.state.book.volumeInfo.imageLinks ? this.state.book.volumeInfo.imageLinks.thumbnail : 'images/no-image-available.png';
      const joinAuthor = this.state.book.volumeInfo.authors ? this.state.book.volumeInfo.authors.join(', ') : 'No author listed';
      const category = this.state.book.volumeInfo.categories ? this.state.book.volumeInfo.categories[0] : 'No subject listed';
      const publishedDate = this.state.book.volumeInfo.publishedDate ? this.state.book.volumeInfo.publishedDate.slice(0, 4) : 'No release date listed';

      return (
        <>
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
          <div className="container top-container">
            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 d-flex justify-content-start back-btn" onClick={this.backToSearchResults} style={{ cursor: 'pointer' }}>&lt; Back to Search Results</div>
              <div className="details-card text-center" style={{ width: '100%' }} id={this.state.book.volumeInfo.bookId}>
                <img src={checkImage} className="card-img-top-details img-thumbnail mt-2 fadeIn first"></img>
                <div className="card-body">
                  <h5 className="card-title text-center fadeIn second">{this.state.book.volumeInfo.title}</h5>
                  <p className="card-author text-center fadeIn second">{joinAuthor}</p>
                  <a className="btn btn-success fadeIn third" onClick={this.props.add}>Add to my list</a>
                  <div className="row book-info fadeIn fourth mt-4">
                    <div className="col-md-6 subject">
                      <p className="text-muted text-uppercase">Subject</p>
                      <p>{category}</p>
                    </div>
                    <div className="col-md-6 fadeIn first">
                      <p className="text-muted text-uppercase">Released</p>
                      <p>{publishedDate}</p>
                    </div>
                  </div>
                  <div className="card-text fadeIn fourth book-desc">
                    {this.getRenderedDescription()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default BookDetails;
