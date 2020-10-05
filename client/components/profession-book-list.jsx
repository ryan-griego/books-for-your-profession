import React from 'react';
import ProfessionBookListItem from './profession-book-list-item';

class ProfessionBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []

    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.setView = this.setView.bind(this);
  }

  getBooks() {
    fetch(`/api/books/${this.props.viewParams.currentProfession}`)
      .then(response => response.json())
      .then(data => this.setState({ books: data }))
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  componentDidMount() {
    this.getBooks();
  }

  setView(e) {
    this.props.view('bookDetails', {});
  }

  // handleChange(event) {
  //   this.setState({ profession: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();

  // }

  render() {
    const bookCount = this.state.books.length;
    const messageCheck = bookCount <= 0 ? 'There are no books listed for this profession yet. We are still waiting for someone to create an account from this profession to add their top books' : '';

    if (this.state.books.error) {
      // this.props.view('searchByProfession', {});
      return (
        <>

          <h1>{`There are no books or booklists in the database with that profession name ${this.props.viewParams.currentProfession} linked to it`}</h1>
        </>
      );

    } else {
      return (
        <>
          <div className="container">
            <h1>{this.props.viewParams.currentProfession}</h1>
            <div className="row row-cols-1 row-cols-md-2 mt-5">
              <div className="card-group">
                {messageCheck}
                {
                  this.state.books.map(book => {
                    return <ProfessionBookListItem
                      key={book.bookId}
                      product={book}
                      name={book.name}
                      author={book.author}
                      genre={book.genre}
                      releaseYear={book.releaseYear}
                      shortDescription={book.shortDescription}
                      bookId={book.bookId}
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
}

export default ProfessionBookList;
