import React from 'react';
import { Navbar } from 'react-bootstrap'; // eslint-disable-line

class NavBar extends React.Component {
	render() {
		return (
      <Navbar className="navbar navbar-default navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Brand</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            {/* Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link> */}
          </Navbar.Text>
          <Navbar.Text pullRight>
            <a href="#">About</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
	}
}

export default NavBar;
