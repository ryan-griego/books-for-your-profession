import React from 'react';

class NavBar extends React.Component {

  render() {

    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Profession Books</a>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="#">Top Books by Profession</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Add Books to my List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Log In/Out</a>
              </li>
            </ul>

          </div>
        </>
      </nav>

    );

  }

}

export default NavBar;
