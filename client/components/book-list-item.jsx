import React from 'react';

class BookListItem extends React.Component {

  render() {
    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      const fixAuthors = this.props.book.author ? this.props.book.author.replace(/{|"|}/g, '').replace(/,/g, ', ') : this.props.book.author;
      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center">
              <p className="rank"><span>#</span>{this.props.rank}</p>
              <img src={this.props.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-author">{fixAuthors}</p>
                <a className="btn btn-primary info-btn" onClick={this.props.view} id={this.props.bookId}>More info</a>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.props.searchType === 'book') {
      const checkImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'images/no-image-available.png';
      const fixedAuthor = this.props.author ? this.props.author.join(', ') : '';
      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center">
              <img src={checkImage} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title text-center">{this.props.name}</h5>
                <p className="card-author text-center">{fixedAuthor}</p>
                <a className="btn btn-primary info-btn" onClick={this.props.view} id={this.props.id} selflink={this.props.link}>More info</a>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default BookListItem;
