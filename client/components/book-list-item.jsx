import React from 'react';

class BookListItem extends React.Component {



  render() {
    const checkAuthor = this.props.author ? `By ${this.props.author}` : '';


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
                <p className="card-text">{checkAuthor}</p>
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
      console.log("log this.props.book in booklistitem", this.props.book);
      const checkImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'images/no-image-available.png';

      // const releaseYear = this.props.releaseYear.slice(0, 4);

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.id}>
              <img src={checkImage} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>

                <p className="card-text">{checkAuthor}</p>
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
