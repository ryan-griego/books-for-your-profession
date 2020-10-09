import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
const $ = window.$;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: '',
      books: [],
      searchField: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setView = this.setView.bind(this);

  }

  setView(e) {

    if (this.props.searchType == 'profession') {
      console.log('log the current search type', this.props.searchType);

      const currentProfession = $(e.target).find('.jwfbbd').attr('value');
      console.log('log the professsion searched - currentProfession', currentProfession);

      this.props.view('bookList', this.props.searchType, { currentProfession });
      console.log('log this.props.view.name', this.props.view.name);

    } else if (this.props.searchType == 'book') {
      const bookResults = this.state.books;
      this.props.view('bookList', this.props.searchType, { bookResults });
    }
  }

  handleChange(event) {
    if (this.props.searchType == 'profession') {
      this.setState({ profession: event.target.value });
    } else if (this.props.searchType == 'book') {
      this.setState({ searchField: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.searchType == 'profession') {
      this.setState({ profession: event.target.value });
      this.setView(event);
    } else if (this.props.searchType == 'book') {
      this.setState({ searchField: event.target.value });

      this.setView(event);
    }

  }

  render() {
    console.log('log this.state.viewSearchType', this.props.searchType);

    console.log('in the render function in search.jsx');
    const allProfessions = professions.map(profession => {
      return {
        key: profession.toLowerCase(),
        value: profession.toLowerCase()

      };
    });
    if (this.props.searchType == 'profession') {

      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">ValueReads</h1>
              <h2><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit}>

                  <ReactSearchBox
                    placeholder="Enter a profession name"
                    data={allProfessions}
                    // onSelect={record => console.log(record)}
                    onSumbit={this.onSumbit}
                    onFocus={() => {
                      // console.log('This function is called when is focused');
                    }}
                    // onChange={value => console.log(value)}
                    fuseConfigs={{
                      threshold: 0.05
                    }}
                    value=""
                  />
                  <input type="submit" value="Search" className="btn btn-success search-button" />
                </form>
              </div>

            </div>
            <div className="product-device box-shadow d-none d-md-block"></div>
            <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
          </div>

        </div>
      );

    } else if (this.props.searchType == 'book') {
      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">ValueReads</h1>
              <h2><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit}>

                  <input type="text" placeholder="Enter a book name" onChange={this.handleChange} />
                  <input type="submit" value="Search" className="btn btn-success search-button" />
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
}

export default Search;
