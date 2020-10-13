import React from 'react';

class ToggleNavBar extends React.Component {

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

    const links = document.getElementsByTagName('A');
    links.onclick = this.backdropClickHandler;
    let sideDrawer = null;
    let backdrop = null;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <nav className="side-drawer"><ul><h2>Profession Books</h2><li><a href="">Search Books by Profession</a></li><li><a href="">Search Books by Title</a></li><li><a href="">Sign in/out</a></li></ul></nav>;
      backdrop = <div className="backdrop" onClick={this.backdropClickHandler}></div>;
    }

    return (
      <div style={{ height: '100%' }}>
        <header className="toolbar">
          <nav className="toolbar-navigation">
            {sideDrawer}
            {backdrop}
            <div>
              <button className="toggle-button" onClick={this.drawerToggleClickHandler}>
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </div>
          </nav>
        </header>
        <main style={{ marginTop: '64px' }}>
        </main>
      </div>
    );
  }
}

export default ToggleNavBar;
