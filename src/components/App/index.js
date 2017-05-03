/*eslint no-unused-vars: "error"*/
import React from 'react';
import NavBar from './nav'; // eslint-disable-line
import './style.css';

class App extends React.Component {
	render() {
		return (
      <div className="App">
        <NavBar />
      </div>
    );
	}
}

export default App;
