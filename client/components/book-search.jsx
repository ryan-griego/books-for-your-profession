import React from 'react';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.setView = this.setView.bind(this);

  }

  setView(e) {
    // this function needs to change
    // const searchedBook = $(e.target).find('.jwfbbd').attr('value');
    const bookResults = this.state.books;
    this.props.view('searchBookList', { bookResults });
  }

  handleChange(event) {
    this.setState({ searchField: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchField: event.target.value });

    this.setView(event);

  }

  render() {

    return (
      <div className="container-fluid">
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-8 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">ValueReads</h1>
            <h2><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h2>
            <a className="btn btn-outline-secondary" href="#">Coming soon</a>
            <div className="s003" >
              <form onSubmit={this.handleSubmit}>

                <input type="text" placeholder="Enter a book name" onChange={this.handleChange}/>
                <input type="submit" value="Search" className="btn btn-success search-button"/>
              </form>
            </div>

          </div>
          <div className="product-device box-shadow d-none d-md-block"></div>
          <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>

      </div>
    );
  }
}

export default BookSearch;
