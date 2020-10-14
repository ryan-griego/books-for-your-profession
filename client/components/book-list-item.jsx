import React from 'react';

class BookListItem extends React.Component {

  render() {

    const count = 300;
    const description = this.props.shortDescription;
    const descriptionText = description ? description.slice(0, count) + (description.length > count ? '...' : '') : ' There currently is no description for this book title.';

    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
              <img src={this.props.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.author}</p>
                <p className="card-text">{descriptionText}</p>
                <a className="btn btn-primary">More information</a>

              </div>
            </div>
          </div>
        </>
      );
    }

    else if (this.props.searchType === 'book') {
      const checkImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'images/no-image-available.png';


      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.id}>
              <img src={checkImage} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>

                <p className="card-text">{this.props.author}</p>
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
