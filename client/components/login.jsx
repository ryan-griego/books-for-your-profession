import React from 'react';

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
    return (
      <div className="wrapper fadeInDown">
        <h1>ValueReads</h1>
        <div id="formContent">
          <div className="fadeIn first">
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="login" className="fadeIn second log-input" name="email" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail}/>
            <input type="password" id="password" className="fadeIn log-input" name="password" placeholder="password" value={this.state.password} onChange={this.handleChangePassword}/>
            <input type="submit" className="fadeIn log-button" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
