import React from 'react';

class NavBar extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <h4>Dashboard</h4>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar