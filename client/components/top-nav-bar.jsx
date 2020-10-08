import React from 'react';

class TopNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  drawerToggleClickHandler(event) {
    event.preventDefault();
    this.setState({ sideDrawerOpen: true });
  }

  backdropClickHandler(event) {
    event.preventDefault();
    this.setState({ sideDrawerOpen: false });
  }

  render() {
    // const links = document.getElementsByTagName('A');
    // links.onclick = this.backdropClickHandler;
    // let sideDrawer = null;
    // let backdrop = null;

    // if (this.state.sideDrawerOpen) {
    //   sideDrawer = <nav className="side-drawer"><ul><h2>Profession Books</h2><li><a href="">Search Books by Profession</a></li><li><a href="">Search Books by Title</a></li><li><a href="">Sign in/out</a></li></ul></nav>;
    //   backdrop = <div className="backdrop" onClick={this.backdropClickHandler}></div>;
    // }

    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <a className="navbar-brand" href="#">ValueReads</a>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">

            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search by
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Profession</a>
              <a className="dropdown-item" href="#">Book name</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Log in</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My List</a>
          </li>

        </ul>
      </nav>
    );
  }
}

export default TopNavBar;
