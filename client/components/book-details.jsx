import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';


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
        console.log("log the result in getGoogleBooksBySelfLink", result.volumeInfo);
        that.setState({ book: result });
        that.setView();
      }),
      function (error) {
        console.log(error);
      };
  }

  componentDidMount() {

    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      fetch(`/api/books/id/${this.props.viewParams.bookId}`)
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

    if (this.props.searchType === 'book') {
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

  render() {

    // console.log("log this.props.viewParams", this.props.viewParams);
    if (!this.state.book) return null;
    if (this.props.searchType === 'profession') {

      const checkSearchButton = this.props.searchType === 'profession' ? this.backToSearch : this.backToUserList;
      const checkSearchText = this.props.searchType === 'profession' ? 'Back to Profession Search' : 'Back to my List';

      const count = 300;
      const description = this.state.book.shortDescription;
      const descriptionText = description ? description.slice(0, count) + (description.length > count ? '...' : '') : ' There currently is no description for this book title.';

      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={checkSearchButton} style={{ cursor: 'pointer' }}>&lt; {checkSearchText}</div>

              <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src={this.state.book.imageurl} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.name}</h5>
                  <p className="card-text">{this.state.book.author}</p>
                  <p className="card-text">{this.props.message}</p>

                  <a className="btn btn-primary">Share</a>
                  <a className="btn btn-primary ml-4">Add to my book list</a>

                  <div className="row">
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
      console.log("log this.props.message", this.props.message);
      const bookExists = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Attention</Popover.Title>
          <Popover.Content>
            This book already exists in your list.
      </Popover.Content>
        </Popover>
      );

      const checkBook = this.props.message ? true : false;


      console.log("log this.state.book.volumeInfo from book-details", this.state.book.volumeInfo);
      const count = 300;
      const description = this.state.book.volumeInfo.description ? this.state.book.volumeInfo.description.replace(/(<([^>]+)>)/gi, "") : 'No description available';

      const descriptionText = description.slice(0, count) + (description.length > count ? '...' : '');
      const joinAuthor = this.state.book.volumeInfo.authors ? this.state.book.volumeInfo.authors.join(' ') : 'No author listed';
      const category = this.state.book.volumeInfo.categories ? this.state.book.volumeInfo.categories : 'N/A';
      const publishedDate = this.state.book.volumeInfo.publishedDate ? this.state.book.volumeInfo.publishedDate : 'No release date listed'

      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.backToSearch} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

              <div className="card text-center" style={{ width: '100%' }} id={this.state.book.volumeInfo.bookId}>
                <img src={this.state.book.volumeInfo.imageLinks.thumbnail} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.volumeInfo.title}</h5>
                  <p className="card-text">{joinAuthor}</p>

                  <a className="btn btn-primary">Share</a>
                  <OverlayTrigger type="submit" value="Search" trigger="click" placement="bottom" overlay={bookExists} show={checkBook}>
                    <a className="btn btn-primary ml-4" onClick={this.props.add}>Add to my list</a>

                  </OverlayTrigger>

                  <div className="row">
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
    } else if (this.props.searchType === 'user') {

      const checkSearchButton = this.props.searchType === 'profession' ? this.backToSearch : this.backToUserList;
      const checkSearchText = this.props.searchType === 'profession' ? 'Back to Profession Search' : 'Back to my List';

      const count = 300;
      const description = this.state.book.shortDescription;
      const descriptionText = description ? description.slice(0, count) + (description.length > count ? '...' : '') : ' There currently is no description for this book title.';
      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={checkSearchButton} style={{ cursor: 'pointer' }}>&lt; {checkSearchText}</div>

              <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src={this.state.book.imageurl} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.name}</h5>
                  <p className="card-text">{this.state.book.author}</p>
                  <p className="card-text">{this.props.message}</p>

                  <a className="btn btn-primary">Share</a>
                  <a className="btn btn-primary ml-4 btn-danger" onClick={this.props.delete}>Delete from my list</a>

                  <div className="row">
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


    }
  }

}

export default BookDetails;
