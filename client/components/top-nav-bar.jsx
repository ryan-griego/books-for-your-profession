import React from 'react';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

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
    console.log('you hit set view');
    console.log('log the e.currentTarget.id', searchType);

    console.log('log the search type', this.props.searchType);

    if (searchType === 'user') {

      this.props.getUserList();

      // this.props.view('bookList', searchType, { });
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

  render() {

    const noBooks = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Attention</Popover.Title>
        <Popover.Content>
          {this.props.message}
        </Popover.Content>
      </Popover>
    );

    const renderPopover = props => (
      <Popover id={'popover-positioned-bottom'}>
        <Popover.Title as="h3">{'Popover bottom'}</Popover.Title>
        <Popover.Content>
          <strong>Holy guacamole!</strong> Check this info.
        </Popover.Content>
      </Popover>
    );

    const checkBook = !!this.props.message;

    const checkLoginStatus = this.props.loginStatus ? 'Log out' : 'Log in';

    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <a className="navbar-brand" id="profession" href="#" onClick={this.setView}>
          <img src="images/logo.png" width="60" height="60" alt=""/>
        </a>
        <a className="navbar-brand" href="#" onClick={this.setView}>ValueReads</a>

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
          <li className="nav-item px-2">

            <OverlayTrigger trigger="focus" placement="bottom" flip={true} rootClose overlay={noBooks} show={checkBook}>
              <a className="nav-link" href="#" onClick={this.setView} id="user">My List</a>

            </OverlayTrigger>          </li>

          <li className="nav-item px-2">
            <button type="button " className="btn btn-light" onClick={this.setView} id="log">{checkLoginStatus}</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default TopNavBar;
