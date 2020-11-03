import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null

    };
    this.setView = this.setView.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
    this.backToUserList = this.backToUserList.bind(this);
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
        console.log('log the result in getGoogleBooksBySelfLink', result.volumeInfo);
        that.setState({ book: result });
        that.setView();
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {

    if (this.props.searchType === 'user') {
      console.log('you hit rith before check profession');

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

  checkDetails() {

    if (this.props.searchType === 'profession') {


      const checkBook = !!this.props.message;
      console.log("tell me the current login Status", this.props.loginStatus);
      console.log("tell me the this.props.searchedProfession in check Details in book details", this.props.searchedProfession);
      if(this.props.loginStatus) {
      return (
          <a className="btn btn-primary" onClick={this.props.add}>Add to my list</a>

      );
      }

    } else if (this.props.searchType === 'user') {
      return (
        <a className="btn btn-primary btn-danger" onClick={this.props.delete}>Delete from my list</a>

      );

    }

  }

  render() {

    if (!this.state.book) return null;

    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {

      const checkSearchButton = this.props.searchType === 'profession' ? this.backToSearch : this.backToUserList;
      const checkSearchText = this.props.searchType === 'profession' ? 'Back to Profession Search' : 'Back to my List';

      const count = 300;
      const description = this.state.book.shortDescription ? this.state.book.shortDescription.replace(/(<([^>]+)>)/gi, '') : 'No description available';

      const descriptionText = description ? description.slice(0, count) + (description.length > count ? '...' : '') : ' There currently is no description for this book title.';

      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={checkSearchButton} style={{ cursor: 'pointer' }}>&lt; {checkSearchText}</div>

              <div className="details-card text-center fadeIn" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src={this.state.book.imageurl} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.name}</h5>
                  <p className="card-text">{this.state.book.author}</p>

                  {/* <a className="btn btn-primary">Share</a> */}
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
                  <div className="row book-info">
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Genre</p>
                      <p>{this.state.book.genre}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Released</p>
                      <p>{this.state.book.releaseYear}</p>
                    </div>
                  </div>
                  <p className="card-text">{descriptionText}</p>
                </div>
              </div>
            </div>

          </div>

        </>

      );
    } else if (this.props.searchType === 'book') {


      const checkBook = !!this.props.message;
      const count = 300;
      const description = this.state.book.volumeInfo.description ? this.state.book.volumeInfo.description.replace(/(<([^>]+)>)/gi, '') : 'No description available';
      const checkImage = this.state.book.volumeInfo.imageLinks ? this.state.book.volumeInfo.imageLinks.thumbnail : 'images/no-image-available.png';

      const descriptionText = description.slice(0, count) + (description.length > count ? '...' : '');
      const joinAuthor = this.state.book.volumeInfo.authors ? this.state.book.volumeInfo.authors.join(' ') : 'No author listed';
      const category = this.state.book.volumeInfo.categories ? this.state.book.volumeInfo.categories : 'N/A';
      const publishedDate = this.state.book.volumeInfo.publishedDate ? this.state.book.volumeInfo.publishedDate.slice(0, 4) : 'No release date listed';

      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.backToSearch} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

              <div className="details-card fadeIn text-center" style={{ width: '100%' }} id={this.state.book.volumeInfo.bookId}>
                <img src={checkImage} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title text-center">{this.state.book.volumeInfo.title}</h5>
                  <p className="card-text text-center">{joinAuthor}</p>

                  {/* <a className="btn btn-primary">Share</a> */}
                    <a className="btn btn-primary" onClick={this.props.add}>Add to my list</a>


                  <div className="row book-info">
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Genre</p>
                      <p>{category}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Released</p>
                      <p>{publishedDate}</p>
                    </div>
                  </div>
                  <p className="card-text">{descriptionText}</p>
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
