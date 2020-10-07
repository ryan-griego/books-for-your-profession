import React from 'react';
import SearchedBookListItem from './searched-book-list-item';

class SearchedBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []

    };

    this.setView = this.setView.bind(this);
  }

  getGoogleBooks(event) {
    const apiKey = 'AIzaSyCVzgENyKeQd7d3p8xZecRg5JQoM0D_X1I';
    // const book = encodeURIComponent(this.state.searchField);
    const that = this;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=' + 'the%20giver' + '&key=' + ${apiKey} + '&maxResults=5`)
      .then(function (res) {
        return res.json();

      })
      .then(function (result) {
        // const title = result.items[0].volumeInfo.title;
        // const author = result.items[0].volumeInfo.authors.toString();
        // const publishedDate = result.items[0].volumeInfo.publishedDate;
        // const publishedYear = publishedDate.slice(0, 4);
        // const genre = result.items[0].volumeInfo.categories[0];
        that.setState({ books: [...result.items] });

        // const description = result.items[0].volumeInfo.description;
        that.setView(event);
      }),
    function (error) {
      console.log(error);
    };
  }

  componentDidMount() {
    this.getGoogleBooks();
  }

  setView(e) {
    // needs work

    // this.props.view('bookDetails', { });
    // console.log('log this.props', this.props);

  }

  render() {
    // need to add a screen letting the user know that there are no books with that title

    const bookCount = this.state.books.length;
    const messageCheck = bookCount <= 0 ? 'There are no books listed for the title' : '';
    // if (this.state.books.error) {
    //   // this.props.view('searchByProfession', {});
    //   return (
    //     <>
    //       <div className="container">
    //         <h2>{`There are no books or booklists in the database with the profession ${this.props.viewParams.currentProfession} linked to it`}</h2>
    //       </div>
    //     </>
    //   );

    // } else {
    return (
      <>
        <div className="container">
          <h1></h1>
          <div className="row row-cols-1 row-cols-md-2 mt-5">
            <div className="card-group">
              {messageCheck}
              {
                this.state.books.map((book, index) => {

                  return <SearchedBookListItem
                    key={index}
                    book={book.volumeInfo}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    name={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    genre={book.volumeInfo.categories}
                    releaseYear={book.volumeInfo.publishedDate}
                    shortDescription={book.volumeInfo.description}
                    view={this.setView} />;
                })
              }

            </div>
          </div>
        </div>
      </>
    );
  }

}
// }

export default SearchedBookList;
