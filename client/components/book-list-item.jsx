import React from 'react';

class BookListItem extends React.Component {

  render() {

    const count = 300;
    console.log("log the product descriptoin", this.props.shortDescription);
    const description = this.props.shortDescription ? this.props.shortDescription.replace(/(<([^>]+)>)/gi, "") : 'No description available';

    const descriptionText = description.slice(0, count) + (description.length > count ? '...' : '');

    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      console.log("log this.props", this.props);
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
            <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.id} selflink={this.props.link}>
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
