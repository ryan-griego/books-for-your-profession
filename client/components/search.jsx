import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

const $ = window.$;

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profession: '',
      books: [],
      searchField: '',
      message: '',
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setView = this.setView.bind(this);

  }

  setView(e) {

    if (this.props.searchType === 'profession') {
      const currentProfession = $(e.target).find('.jwfbbd').attr('value');
      this.props.view('bookList', this.props.searchType, { currentProfession });

    } else if (this.props.searchType === 'book') {
      const searchedBook = $(e.target).find('.book-search-bar').attr('value');
      this.props.view('bookList', this.props.searchType, { searchedBook });
    }
  }

  handleChange(event) {
    if (this.props.searchType === 'profession') {
      this.setState({ profession: event.target.value });
    } else if (this.props.searchType == 'book') {
      this.setState({ searchField: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const newProfessions = professions.map(profession => {
      return profession.toLowerCase();
    });

    const searchValue = $(event.target).find('.jwfbbd').attr('value');
    if (searchValue.length === 0) {
      this.setState({ errorMessage: 'There is no text entered in the search field' });
    }

    if (this.props.searchType === 'profession') {
      const currentProfession = $(event.target).find('.jwfbbd').attr('value');
      const findProfession = newProfessions.indexOf(currentProfession);
      if (currentProfession.length === 0) {
        this.setState({ errorMessage: 'There is no text entered in the search field' });
        console.log('there was nothing entered into the profession search field');
      } else if (findProfession === -1) {
        this.setState({ errorMessage: 'A profession with that name was not found.' });

        console.log('a profession with that name was not found');
      } else {
        this.checkProfession(currentProfession);
        this.setState({ profession: event.target.value });
      }
    } else if (this.props.searchType === 'book') {
      this.checkGoogleBooks(this.state.searchField);
      this.setState({ searchField: this.state.searchField });
    }

  }

  checkProfession(currentProfession) {

    fetch(`/api/professions/${currentProfession}`)
      .then(response => {
        if (response.status === 404) {
          console.log('You got a 404 response');
          this.setState({ errorMessage: 'There are no books associated with that profession yet.' });

        } else if (response.status === 200) {
          this.props.view('bookList', this.props.searchType, { currentProfession });
          return response.json();

        }
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  checkGoogleBooks(booktitle) {
    const book = encodeURIComponent(booktitle);

    fetch('https://www.googleapis.com/books/v1/volumes?q=' + book + '&maxResults=5')
      .then(response => {
        if (response.status === 404) {
          console.log('You got a 404 response');
          this.setState({ errorMessage: 'There are no books found with that title.' });

        } else if (response.status === 200) {
          return response.json();

        }
      })
      .then(data => {
        if (data.totalItems === 0) {
          this.setState({ errorMessage: 'Unfortunately there are not yet any books found with that title.' });

        } else if (data.totalItems >= 1) {
          this.props.view('bookList', this.props.searchType, { book });
        }

      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });

  }

  render() {

    const renderTooltip = props => (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );

    // function renderTooltip(props) {
    //   return <Tooltip {...props}>tooltip</Tooltip>;
    // }

    if (this.props.searchType == 'profession') {
      const errorMessage = this.state.errorMessage;

      const noProfession = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Unavailable</Popover.Title>
          <Popover.Content>
            {this.state.errorMessage}
          </Popover.Content>
        </Popover>
      );

      const checkPopover = errorMessage !== '';
      const allProfessions = professions.map(profession => {
        return {
          key: profession.toLowerCase(),
          value: profession.toLowerCase()

        };
      });

      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="display-4 title">ValueReads</h1>

              <h2><strong>An online community building a comprehensive list of the most valuable books for your profession</strong></h2>

              <div className="s003 fadeIn" >

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
                  <OverlayTrigger type="submit" value="Search" trigger="click" placement="bottom" overlay={renderTooltip} show={checkPopover} delay={{ show: 250, hide: 400 }}>
                    <input type="submit" value="Search" className="btn btn-success search-button" />

                  </OverlayTrigger>

                </form>
              </div>

            </div>
            <div className="product-device box-shadow d-none d-md-block"></div>
            <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
          </div>
        </div>
      );

    } else if (this.props.searchType === 'book') {
      const errorMessage = this.state.errorMessage;

      const noBook = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Unavailable</Popover.Title>
          <Popover.Content>
            {this.state.errorMessage}
          </Popover.Content>
        </Popover>
      );

      const checkPopover = errorMessage !== '';

      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="display-4 title">ValueReads</h1>
              <h2><strong>An online community building a comprehensive list of the most valuable books for your profession</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit} className="fadeIn">

                  <input type="text" className="book-search-bar jwfbbd" placeholder="Enter a book name" onChange={this.handleChange} value={this.state.searchField || ''} />
                  <OverlayTrigger type="submit" value="Search" trigger="click" placement="bottom" overlay={noBook} show={checkPopover}>
                    <input type="submit" value="Search" className="btn btn-success search-button" />

                  </OverlayTrigger>
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
