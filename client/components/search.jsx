import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

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
      console.log("log the current profession in search.jsx", currentProfession);
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

    console.log("log the event.target in handlesubmit", event.target);
    const newProfessions = professions.map(profession => {
      return profession.toLowerCase();
    });

    let searchValue = $(event.target).find('.jwfbbd').attr('value');
    console.log("log the length of the search field", searchValue.length);
    if (searchValue.length === 0) {
      this.setState({ errorMessage: "There is no text entered in the search field" });


    }



    if (this.props.searchType === 'profession') {
      let currentProfession = $(event.target).find('.jwfbbd').attr('value');
      console.log("log the currentProfession", currentProfession);
      const findProfession = newProfessions.indexOf(currentProfession);
      console.log(findProfession);
      if(findProfession === -1) {
        this.setState({ errorMessage: "A profession with that name was not found." });

        console.log("a profession with that name was not found");
     }
      else {
        this.checkProfession(currentProfession);
        this.setState({ profession: event.target.value });
        // this.setView(event);

      }
    } else if (this.props.searchType === 'book') {
      this.checkGoogleBooks(this.state.searchField);
      this.setState({ searchField: this.state.searchField });

      // this.setView(event);

    }

  }


  checkProfession(currentProfession) {
    console.log("you triggered checkProfession");

    fetch(`/api/professions/${currentProfession}`)
      .then(response => {
        console.log("the the response.status", response.status);
        if(response.status === 404) {
          console.log("You got a 404 response");
          this.setState({ errorMessage: 'There are no books associated with that profession yet.' });
          return;

        }
        else if (response.status === 200) {
          console.log("log the response in checkProfession", response)
        response.json()
          this.props.view('bookList', this.props.searchType, { currentProfession });

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
    console.log("log the book title pass into checkGoogleBooks", booktitle);
    const book = encodeURIComponent(booktitle);

    console.log("you triggered checkGoogleBooks");
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + book + '&maxResults=5')
      .then(response => {
        if (response.status === 404) {
          console.log("You got a 404 response");
          this.setState({ errorMessage: 'There are no books found with that title.' });
          return;

        }
        else if (response.status === 200) {
          return response.json();
          // THIS IS WHERE WE CHANGE THE VIEW TO BOOKLIST IF THE CHECK WENT THROUGH
          // this.props.view('bookList', this.props.searchType, { book });

        }
      })
      .then(data => {

        if(data.totalItems === 0) {
          this.setState({ errorMessage: 'Unfortunately there are not yet any books found with that title.' });

          return;
        }

        else if(data.totalItems >= 1) {
        this.props.view('bookList', this.props.searchType, { book });

        }

      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });

  }

  render() {


    if (this.props.searchType == 'profession') {
      const errorMessage = this.state.errorMessage;
      console.log("log the error message from search.jsx", errorMessage);


      const noProfession = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Unavailable</Popover.Title>
          <Popover.Content>
            {this.state.errorMessage}
      </Popover.Content>
        </Popover>
      );



      const checkPopover = errorMessage === "" ? false : true;


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
              <h1 className="display-4 font-weight-normal">ValueReads</h1>

              <h2><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h2>
              <p>{this.state.message}</p>

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
                  <OverlayTrigger type="submit" value="Search" trigger="click" placement="bottom" overlay={noProfession} show={checkPopover}>
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

      const checkPopover = errorMessage === "" ? false : true;


      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-8 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">ValueReads</h1>
              <h2><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit}>

                  <input type="text" className="book-search-bar jwfbbd" placeholder="Enter a book name" onChange={this.handleChange} value={this.state.searchField || ''}/>
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
