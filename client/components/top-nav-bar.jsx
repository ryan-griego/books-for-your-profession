import React from 'react';

class TopNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
    this.setView = this.setView.bind(this);
  }

  setView(e) {
    const searchType = e.currentTarget.id;
    if (searchType === 'user') {
      this.props.getUserList();
      this.props.view('bookList', searchType, { });
    } else if (searchType === 'profession' || searchType === 'book') {
      this.props.resetState();
      this.props.view('search', searchType, { });
    } else if (searchType === 'log') {
      if (this.props.loginStatus) {
        this.props.resetState();
        this.props.logout();
        this.props.updateLoginStatus(false);
        this.props.view('search', 'profession', {});
      } else {
        this.props.view('login', '', {});
      }
    }
  }

  checkUserList() {
    if (this.props.loginStatus) {
      return (
        <li className="nav-item px-2">
          <a className="nav-link" href="#" onClick={this.setView} id="user">My List</a>
        </li>
      );
    }
  }

  render() {
    const checkLoginStatus = this.props.loginStatus ? 'Log out' : 'Log in';
    return (
      <div className="nav-container">
        <nav className="navbar navbar-expand-sm navbar-dark">
          <div onClick={this.setView} id="profession">
            <a className="navbar-brand" href="#">
              <img src="images/book-light-bulb.png" width="60" height="60" alt=""/>
            </a>
            <a className="navbar-brand site-name" href="#">ValueReads</a>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item px-2 dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search by
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#" onClick={this.setView} id="profession">Profession</a>
                <a className="dropdown-item" href="#" onClick={this.setView} id="book">Book name</a>
              </div>
            </li>
            {this.checkUserList()}
            <li className="nav-item px-2">
              <button type="button " className="btn btn-light" onClick={this.setView} id="log">{checkLoginStatus}</button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TopNavBar;
