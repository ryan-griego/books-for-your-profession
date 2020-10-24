import React from 'react';
import ReactDOM from 'react-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    const loginExists = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Attention</Popover.Title>
        <Popover.Content>
          {this.props.message}
        </Popover.Content>
      </Popover>
    );

    const checkLogin = this.props.message === 'Email address and/or password is incorrect. Please try again.';

    return (
      <div className="wrapper fadeInDown">
        <h1>ValueReads</h1>

        <div id="formContent">
          <div className="fadeIn first">
            {/* <img src="" id="icon" alt="User Icon" /> */}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="login" className="fadeIn second log-input" name="email" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail}/>
            <input type="password" id="password" className="fadeIn log-input" name="password" placeholder="password" value={this.state.password} onChange={this.handleChangePassword}/>
            <OverlayTrigger type="submit" value="Search" trigger="click" placement="bottom" overlay={loginExists} show={checkLogin}>
              <input type="submit" value="Submit" className="fadeIn log-button" value="Log In" />
            </OverlayTrigger>
          </form>

        </div>
      </div>
    );
  }
}

export default Login;
