import React from 'react';
import NavBar from './nav';
import './style.css';

class App extends React.Component {
	render() {
		return (
      <div className="App">
        <NavBar />
        <div>
					<h1>McDonald's Healthy Meal Generator</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    );
	}
}

export default App;
