import React from 'react';
import { Navbar } from 'react-bootstrap'; // eslint-disable-line

class NavBar extends React.Component {

	getOffset(element){
		let bounding = element.getBoundingClientRect();
		return {
			top: bounding.top + document.body.scrollTop,
			left: bounding.left + document.body.scrollLeft
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		let navbar = React.findDOMNode(this.refs.navbar);
		let startElement = React.findDOMNode(this.refs.meal);
		let offset = this.getOffset(startElement);
		let windowsScrollTop  = window.pageYOffset;
		if(windowsScrollTop >= offset.top) {
			navbar.classList.add('navbar-fixed-top');
		}
		else {
			navbar.classList.remove('navbar-fixed-top');
		}
	}

	render() {
		return (
      <Navbar className="navbar navbar-default navbar-fixed-top" ref="navbar">
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
