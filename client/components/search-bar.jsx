import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
import ProfessionBookList from './profession-book-list';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(e) {
    // might need to add a value for the params propertie later
    this.props.view('professionBookList', {});

  }

  handleChange(event) {
    this.setState({ profession: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ profession: event.target.value });

    console.log('state: ' + this.state.profession);

    console.log('list all professions: ' + professions);
    this.setView();

  }

  render() {
    const names = [
      {
        key: 'Academic librarian',
        value: 'Academic librarian',
      },
      {
        key: 'Clinical research associate',
        value: 'Clinical research associate',
      },
      {
        key: 'Web developer',
        value: 'Web developer',
      },
      {
        key: 'Plumber',
        value: 'Plumber',
      },
      {
        key: 'Lawyer',
        value: 'Lawyer',
      },
    ];

    return (
      <div className="s003" >
        <form onSubmit={this.handleSubmit}>

      <ReactSearchBox
        placeholder="Enter a profession name"
        data={names}
        onSelect={record => console.log(record)}
        onSumbit={this.onSumbit}
        onFocus={() => {
          console.log('This function is called when is focused')
        }}
        onChange={value => console.log(value)}
        fuseConfigs={{
          threshold: 0.05,
        }}
        value=""
      />
          <input type="submit" value="Search"/>

      </form>

      </div>
    )
  }
}

export default SearchBar;
