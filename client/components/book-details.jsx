import React from 'react';

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null

    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch(`/api/books/id/${this.props.viewParams.bookId}`)
      .then(response => response.json())
      .then(data => this.setState({ book: data }))
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });

  }

  setView(e) {

    this.props.view('searchByProfession', {});
  }

  render() {
    if (!this.state.book) return null;
    return (
      <>
        <div className="container">
          <div className="hover my-3 px-0 btn d-flex justify-content-start" onClick={this.setView} style={{ cursor: 'pointer' }}>&lt; Back to Search</div>

          <div className="col-md-6 mb-4 mx-auto">
            <div className="card text-center" style={{ width: '100%' }} id={this.state.book.bookId}>
              <img src="/images/no-image-available.png" className="card-img-top img-thumbnail mt-2"></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.book.name}</h5>
                <p className="card-text">{this.state.book.author}</p>

                <a className="btn btn-primary">Share</a>
                <a className="btn btn-primary ml-4">Add to my list</a>
                <a className="btn btn-primary ml-4" onClick={this.setView}>Back to search</a>

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
                <p className="card-text">{this.state.book.shortDescription}</p>
              </div>
            </div>
          </div>

        </div>

      </>

    );
  }

}

export default BookDetails;
