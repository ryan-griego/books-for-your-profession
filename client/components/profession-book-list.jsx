import React from 'react';
import ProfessionBookListItem from './profession-book-list-item';

class ProfessionBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          author: 'William Gibson',
          bookId: 1,
          genre: 'Science Fiction',
          name: 'Neuromancer',
          releaseYear: 1984,
          shortDescription: 'The first book added to this list'
        },
        {
          author: 'Walter Isaacson',
          bookId: 2,
          genre: 'Biography',
          name: 'The Biography of Steve Jobs',
          releaseYear: 2016,
          shortDescription: 'The story of Steve Jobs'
        },
        {
          author: 'Marijn Haverbeke',
          bookId: 3,
          genre: 'Programming',
          name: 'Eloquent Javascript',
          releaseYear: 2018,
          shortDescription: 'How to program in Javascript'
        },
        {
          author: 'Darrin Hardy',
          bookId: 4,
          genre: 'Self-help',
          name: 'The Compound Effect',
          releaseYear: 2015,
          shortDescription: 'How to jumpstart your life, income and more'
        },
        {
          author: 'Isaac Asimov',
          bookId: 5,
          genre: 'Science Fiction',
          name: 'Foundation',
          releaseYear: 1964,
          shortDescription: 'Book one in the trilogy'
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(e) {
    this.props.view('bookDetails', {});
  }

  handleChange(event) {
    this.setState({ profession: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <>
        <div className="card-group">
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
      </>
    );

  }
}

export default ProfessionBookList;
