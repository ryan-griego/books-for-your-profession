import React from 'react';

class BookListItem extends React.Component {

  render() {
    console.log('what is the this.props.searchType inside book-list-item?', this.props.searchType);
    // if statement - if user was searching by profession
    if (this.props.searchType == 'profession' || this.props.searchType == 'user') {

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
              <img src={this.props.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">By {this.props.author}</p>
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

      // const releaseYear = this.props.releaseYear.slice(0, 4);

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} isbn={this.props.isbn}>
              <img src={this.props.book.imageLinks.thumbnail} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>

                <p className="card-text">By {this.props.author}</p>
                {/* <p className="card-text">Released in {releaseYear}</p> */}
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
