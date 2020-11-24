import React from 'react';

class BookListItem extends React.Component {


  render() {
    const count = 300;
    const description = this.props.shortDescription ? this.props.shortDescription.replace(/(<([^>]+)>)/gi, '') : 'No description available';
    // const descriptionText = description.slice(0, count) + (description.length > count ? '...' : '');

    console.log("log this.props.searchType", this.props.searchType);
    if (this.props.searchType === 'profession' || this.props.searchType === 'user') {
      console.log("log the this.props", this.props);

      // console.log("log the this.props.author with replace", this.props.author.replace(/{|"|}/g, '').replace(/,/g, ', '));
      // console.log("log the this.props.author.length", this.props.author.length);

      let fixAuthors = this.props.book.author ? this.props.book.author.replace(/{|"|}/g, '').replace(/,/g, ', ') : this.props.book.author;

      // console.log("tell me the type of fixAuthors", typeof fixAuthors);
      // console.log("log the fixAuthors", fixAuthors);
      console.log("log this.props.book", this.props.book);
      console.log("log this.props.book.author", this.props.book.author);

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
              <p className="card-text rank"><span>#</span>{this.props.rank}</p>

              <img src={this.props.image} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{fixAuthors}</p>
                <a className="btn btn-primary info-btn">More information</a>

              </div>
            </div>
          </div>
        </>
      );
    } else if (this.props.searchType === 'book') {
      const checkImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'images/no-image-available.png';
      console.log("log this.props.author", this.props.author);

      // if (this.props.author.length > 1) {

      //   for (let i = 0; i <= this.props.author.length; i++) {
      //     console.log("log this.props.author[i]", this.props.author[i]);
      //     return this.props.author[i];
      //   }

      // }


      // const fixAuthors = this.props.author.length > 1 ? this.props.author.replace(/,/g, ', ') : this.props.author;
      console.log("log this.props.author in book search", this.props.author);
      const fixedAuthor = this.props.author ? this.props.author.join(', ') : '';

      return (
        <>
          <div className="col-md-4 mb-4">
            <div className="card fadeIn text-center" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.id} selflink={this.props.link}>
              <img src={checkImage} className="card-img-top"></img>
              <div className="card-body">
                <h5 className="card-title text-center">{this.props.name}</h5>
                <p className="card-text text-center">{fixedAuthor}</p>
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
