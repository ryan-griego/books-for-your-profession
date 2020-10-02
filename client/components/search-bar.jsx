import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    this.setState({ profession: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('state: ' + this.state.profession);
    console.log('list all professions: ' + professions);



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
          console.log('This function is called when is focussed')
        }}
        onChange={value => console.log(value)}
        fuseConfigs={{
          threshold: 0.05,
        }}
        value=""
      />
      </form>

      </div>
    )
  }
}

export default SearchBar;
