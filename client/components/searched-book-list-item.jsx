import React from 'react';

class SearchedBookListItem extends React.Component {

  render() {
    // const count = 80;
    // const maxDescription = this.props.shortDescription.slice(0, count) + (this.props.shortDescription.length > count ? '...' : '');
    const releaseYear = this.props.releaseYear.slice(0, 4);

    return (
      <>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: '18rem' }} onClick={this.props.view} isbn={this.props.isbn}>
            <img src={this.props.book.imageLinks.thumbnail} className="card-img-top"></img>
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>

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

export default SearchedBookListItem;
