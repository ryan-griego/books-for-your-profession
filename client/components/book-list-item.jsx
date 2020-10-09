import React from 'react';

class BookListItem extends React.Component {

  render() {

    // if statement - if user was searching by profession
    if (this.props.searchType == 'profession') {

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
              <img src={this.props.book.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.author}</p>
                <p className="card-text">{this.props.shortDescription}</p>
                <a className="btn btn-primary">More information</a>

              </div>
            </div>
          </div>
        </>
      );
    }

    // else if statement - if user was searching by book name
    else if (this.props.searchType == 'book') {
      const releaseYear = this.props.releaseYear.slice(0, 4);

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} isbn={this.props.isbn}>
              <img src={this.props.book.imageLinks.thumbnail} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <h5 className="card-title">{this.props.isbn}</h5>

                <p className="card-text">{this.props.author}</p>
                <p className="card-text">Published: {releaseYear}</p>
                <a className="btn btn-primary">More information</a>

              </div>
            </div>
          </div>
        </>
      );

    }
  }
}

export default BookListItem;
