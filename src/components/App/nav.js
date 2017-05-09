import React from 'react';
import { Navbar } from 'react-bootstrap'; // eslint-disable-line

class NavBar extends React.Component {

	render() {
		return (
      <Navbar className="navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Brand</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            <a href="#">About</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
	}
}

export default NavBar;
