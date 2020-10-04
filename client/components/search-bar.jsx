import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
const $ = window.$;

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
    const currentProfession = $(e.target).find('.jwfbbd').attr('value');
    this.props.view('professionBookList', { currentProfession });

  }

  handleChange(event) {
    this.setState({ profession: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ profession: event.target.value });
    this.setView(event);

  }

  render() {

    const allProfessions = professions.map(profession => {
      return {
        key: profession.toLowerCase(),
        value: profession.toLowerCase()

      };
    });

    return (
      <div className="container">
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
            <input type="submit" value="Search" className="btn btn-success search-button"/>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
