import React from 'react';

class BookListItem extends React.Component {

  render() {
    const count = 300;
    const description = this.props.shortDescription ? this.props.shortDescription.replace(/(<([^>]+)>)/gi, '') : 'No description available';
    // const descriptionText = description.slice(0, count) + (description.length > count ? '...' : '');

    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
              <p className="card-text rank"><span>#</span>{this.props.rank}</p>

              <img src={this.props.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.author}</p>
                <a className="btn btn-primary info-btn">More information</a>

              </div>
            </div>
          </div>
        </>
      );
    } else if (this.props.searchType === 'book') {
      const checkImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'images/no-image-available.png';

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.id} selflink={this.props.link}>
              <img src={checkImage} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title text-center">{this.props.name}</h5>
                <p className="card-text text-center">{this.props.author}</p>
                <a className="btn btn-primary info-btn">More information</a>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default BookListItem;
