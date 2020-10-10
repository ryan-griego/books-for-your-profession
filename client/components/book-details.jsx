import React from 'react';

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null

    };
    this.setView = this.setView.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

  }

  getGoogleBooksByIsbn() {
    // console.log("tell me the isbn from book-details", this.props.viewParams.bookIsbn);
    const isbn = this.props.viewParams.bookIsbn;
    console.log('tell me the isbn from book-details', isbn);

    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
      .then(function (res) {
        return res.json();

      })
      .then(function (result) {
        that.setState({ book: result.items[0].volumeInfo });
        that.setView();
        console.log('tell me the state of books in book-details', that.state.book);
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {
    // if statement here
    if (this.props.searchType == 'profession' || this.props.searchType == 'user') {

      fetch(`/api/books/id/${this.props.viewParams.bookId}`)
        .then(response => response.json())
        .then(data => this.setState({ book: data }))
        .catch(error => {
          console.error('There was a problem with your fetch GET operation: ', error);
        });

    }

    // if else statement here
    if (this.props.searchType == 'book') {
      this.getGoogleBooksByIsbn();
    }

  }

  setView(e) {

    // this.props.view('search', {});
    if (this.props.searchType == 'book') {
      const bookObject = this.state.book;
      console.log('log the bookObject', bookObject);

      this.props.view('bookDetails', this.props.searchType, { bookObject });
    }
  }

  backToSearch() {
    // Works when i make this new function
    // This cannot stay at changing the searchtype to book and has to go back to home eventually
    this.props.view('search', 'profession', {});
    console.log('backToSearch was activated');
  }

  render() {
    if (!this.state.book) return null;
    console.log('show me the state of book', this.state.book);
    if (this.props.searchType == 'profession' || this.props.searchType == 'user') {
      const count = 300;
      const description = this.state.book.shortDescription;
      const limitedDescription = description.slice(0, count) + (description.length > count ? '...' : '');
      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.backToSearch} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

              <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src="" className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.name}</h5>
                  <p className="card-text">{this.state.book.author}</p>

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
                  <p className="card-text">{limitedDescription}</p>
                </div>
              </div>
            </div>

          </div>

        </>

      );
    } else if (this.props.searchType == 'book') {
      const count = 300;
      const description = this.state.book.description;
      const limitedDescription = description.slice(0, count) + (description.length > count ? '...' : '');

      const releaseYear = this.state.book.publishedDate.slice(0, 4);
      let bookObject = this.state.book;



      // this.props.view('bookDetails', this.props.searchType, { bookObject });

      return (
        <>
          <div className="container">

            <div className="col-md-6 mb-4 mx-auto">
              <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.backToSearch} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

              <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
                <img src={this.state.book.imageLinks.thumbnail} className="card-img-top img-thumbnail mt-2"></img>
                <div className="card-body">
                  <h5 className="card-title">{this.state.book.title}</h5>
                  <p className="card-text">{this.state.book.authors}</p>

                  <a className="btn btn-primary">Share</a>
                  <a className="btn btn-primary ml-4" onClick={this.props.add}>Add to my list</a>

                  <div className="row">
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Genre</p>
                      <p>{this.state.book.categories}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-muted text-uppercase">Released</p>
                      <p>{releaseYear}</p>
                    </div>
                  </div>
                  <p className="card-text">{limitedDescription}</p>
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
