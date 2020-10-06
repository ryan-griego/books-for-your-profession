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
    const bookId = e.currentTarget.getAttribute('id');
    this.props.view('bookDetails', { bookId });
  }

  render() {
    if (!this.state.book) return null;
    return (
      <>
        <div className="container">
          <div className="col-md-6 mb-4 mx-auto">
            <div className="card text-center" style={{ width: '100%' }} onClick={this.props.view} id={this.state.book.bookId}>
              <img src={this.state.book.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.book.name}</h5>
                <p className="card-text">{this.state.book.author}</p>
                <p className="card-text">{this.state.book.shortDescription}</p>
                <a className="btn btn-primary">More information</a>

              </div>
            </div>
          </div>

        </div>

      </>

    );
  }

}

export default BookDetails;
