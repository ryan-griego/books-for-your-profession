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
    console.log("my list was clicked!");
    console.log("log the searchType variable", searchType);

    if (searchType == 'user') {
      this.props.view('bookList', searchType, { });
      console.log("log this.props.view.params", this.props.viewParams);

    } else if(searchType == 'profession' || searchType == 'book') {

      this.props.view('search', searchType, { });
    }
  }

  render() {

    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <a className="navbar-brand" href="#">ValueReads</a>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">

            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search by
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#" onClick={this.setView} id="profession">Profession</a>
              <a className="dropdown-item" href="#" onClick={this.setView} id="book">Book name</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Log in</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={this.setView} id="user">My List</a>
          </li>

        </ul>
      </nav>
    );
  }
}

export default TopNavBar;
