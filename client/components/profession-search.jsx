import React from 'react';
import professions from 'professions';
import ReactSearchBox from 'react-search-box';
const $ = window.$;

class ProfessionSearch extends React.Component {
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
      <div className="container-fluid">
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-8 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">ValueReads</h1>
            <h1><strong>AN ONLINE COMMUNITY BUILDING THE MOST COMPREHENSIVE LIST OF INFLUENTIAL BOOKS FOR ALL PROFESSIONS</strong></h1>
            <a className="btn btn-outline-secondary" href="#">Coming soon</a>
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
  }
}

export default ProfessionSearch;
