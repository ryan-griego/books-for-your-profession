import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
import { ToastContainer, toast } from 'react-toastify';

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
    } else if (this.props.searchType === 'book') {
      this.setState({ searchField: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const Msg = ({ closeToast }) => (
      <div>
        {this.state.errorMessage}
      </div>
    );
    const notify = () => toast.error(<Msg />);
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
        notify();
      } else if (findProfession === -1) {
        this.setState({ errorMessage: 'A profession with that name was not found.' });
        notify();
      } else {
        this.checkProfession(currentProfession);
        this.setState({ errorMessage: `${currentProfession} currently has no books associated with it.` });
        // notify();
        this.setState({ profession: event.target.value });
      }
    } else if (this.props.searchType === 'book') {
      this.checkGoogleBooks(this.state.searchField);
      this.setState({ searchField: this.state.searchField });
    }
  }

  checkProfession(currentProfession) {
    const Msg = ({ closeToast }) => (
      <div>
        {this.state.errorMessage}
      </div>
    );
    const notify = () => toast.error(<Msg />);
    fetch(`/api/professions/${currentProfession}`)
      .then(response => {
        if (response.status === 404) {
          notify();
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          this.props.view('bookList', this.props.searchType, { currentProfession });

        }
      })
      .catch(error => {
        notify();
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  checkGoogleBooks(booktitle) {
    const book = encodeURIComponent(booktitle);
    const Msg = ({ closeToast }) => (
      <div>
        {this.state.errorMessage}
      </div>
    );
    const notify = () => toast.error(<Msg />);

    fetch('https://www.googleapis.com/books/v1/volumes?q=' + book + '&maxResults=5')
      .then(response => {
        if (response.status === 404) {
          this.setState({ errorMessage: 'There are no books found with that title.' });
          notify();
        } else if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          this.setState({ errorMessage: 'There is no text entered in the search field.' });
          notify();
          return response.json();
        }
      })
      .then(data => {
        if (data.totalItems === 0) {
          this.setState({ errorMessage: 'Unfortunately there are not yet any books found with that title.' });
          notify();
        } else if (data.totalItems >= 1) {
          this.props.view('bookList', this.props.searchType, { book });
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  render() {
    if (this.props.searchType === 'profession') {
      const allProfessions = professions.map(profession => {
        return {
          key: profession.toLowerCase(),
          value: profession.toLowerCase()
        };
      });

      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-10 p-lg-5 mx-auto my-5">
              <h2 className="tag-question"><strong>Which books have greatly impacted the world&#39;s most common professions?</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit} className="flex-inner fadeIn">
                  <ReactSearchBox
                    placeholder="Enter a profession name"
                    data={allProfessions}
                    onSumbit={this.onSumbit}
                    fuseConfigs={{
                      threshold: 0.05
                    }}
                    value=""
                  />
                  <div>
                    <button type="submit" className="btn btn-success search-button-ht">
                      <i className="fas fa-search"></i>
                    </button>
                    <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover={false}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="product-device box-shadow d-none d-md-block"></div>
            <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
          </div>
        </div>
      );
    } else if (this.props.searchType === 'book') {
      return (
        <div className="container-fluid">
          <div className="position-relative overflow-hidden p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-10 p-lg-5 mx-auto my-5">
              <h2 className="tag-question"><strong>Which books have greatly impacted the world&#39;s most common professions?</strong></h2>
              <div className="s003" >
                <form onSubmit={this.handleSubmit} className="fadeIn flex-inner">
                  <input type="text" className="main-search-bar jwfbbd" placeholder="Enter a book name" onChange={this.handleChange} value={this.state.searchField || ''} />
                  <button type="submit" className="btn btn-success search-button">
                    <i className="fas fa-search"></i>
                  </button>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                  />
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
