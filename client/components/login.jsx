import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.setView = this.setView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    // only email - password
    this.setState({ email: event.target.value });

  }

  handleSubmit(event) {
    console.log('state: ' + this.state);
    event.preventDefault();
  }

  setView(e) {


  }

  render() {

    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" value={this.state.value} onChange={this.handleChange}/>
            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"/>
              <input type="submit" value="Submit" className="fadeIn fourth" value="Log In"/>
        </form>
          <div id="formFooter">
            <a className="underlineHover" href="#">Forgot Password?</a>
          </div>

         </div>
        </div>
    );
  }
}

export default Login;
