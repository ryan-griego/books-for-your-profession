import React from 'react';

class SearchBookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null

    };
    this.setView = this.setView.bind(this);
    this.setViewSearch = this.setViewSearch.bind(this);

  }

  getGoogleBooksByIsbn(event) {
    const isbn = this.props.viewParams.bookIsbn;
    const that = this;
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
      .then(function (res) {
        return res.json();

      })
      .then(function (result) {
        that.setState({ book: result.items[0] });
        that.setView(event);
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {
    this.getGoogleBooksByIsbn();
  }

  setView(e) {
    const bookObject = this.state.book;
    this.props.view('searchBookDetails', { bookObject });
  }

  setViewSearch(e) {
    // Works when i make this new function
    const bookObject = this.state.book;
    this.props.view('search', { });
    console.log('setViewSearch was activated');
  }

  render() {
    // CHECK THIS
    // const releaseYear = this.state.book.volumeInfo.publishedDate.slice(0, 4);

    if (!this.state.book) return null;
    return (
      <>
        <div className="container">
          <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

          <div className="col-md-6 mb-4 mx-auto">
            <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
              <img src={this.state.book.volumeInfo.imageLinks.thumbnail} className="card-img-top img-thumbnail mt-2"></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.book.volumeInfo.title}</h5>
                <p className="card-text">{this.state.book.volumeInfo.authors}</p>

                <a className="btn btn-primary">Share</a>
                <a className="btn btn-primary ml-4">Add to my list</a>
                <a className="btn btn-primary ml-4" onClick={this.setViewSearch}>Back to search - Works when i make setviewSearch function</a>

                <div className="row">
                  <div className="col-md-6">
                    <p className="text-muted text-uppercase">GENRE</p>
                    <p>{this.state.book.volumeInfo.categories}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-muted text-uppercase">Released</p>
                    <p>{this.state.book.volumeInfo.publishedDate}</p>
                  </div>
                </div>
                <p className="card-text">{this.state.book.volumeInfo.description}</p>
              </div>
            </div>
          </div>

        </div>

      </>

    );
  }

}

export default SearchBookDetails;
