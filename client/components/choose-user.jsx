import React from 'react';

export default class ChooseUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ activeUser: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const chooseUser = this.props.chooseUser;
    chooseUser(this.state.activeUser);
  }

  render() {
    return (
      <>
        <div className='container login-container btn-color top-container'>
          <div className='main'>
            <div className="ml-2 text-center fadeIn first">
              <img className="logo" src="../images/book-light-bulb.png"></img>
            </div>
            <header className="header d-flex justify-content-center">
              <h1 className="display-4 title fadeIn second">Books For Your Profession</h1>
            </header>
            <form className='d-flex flex-column justify-content-center align-items-center mt-3 fadeIn third' onSubmit={this.handleSubmit}>
              <p className="back-btn">Select a user to log in</p>
              <select style={{ fontSize: '18px' }} className='select-option btn-group dropdown w-75' type="button" value={this.state.activeUser} required onChange={this.handleChange}>
                <option style={{ fontSize: '12px', color: 'black' }} className='dropdown-item' value="" disabled >Select User</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="1">Ryan Griego - Web developer</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="2">Mike Athan - Marketing assistant</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="3">George Wilson -  Animator</option>
              </select>
              <div className='mt-5 mb-5'>
                <button className='btn btn-success search-button fadeIn fourth'>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
