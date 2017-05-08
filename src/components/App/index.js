/*eslint no-console: "off"*/
import React from 'react';
import NavBar from './nav';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Menu from './menu.js';
import { init } from './chart.js';
import './style.css';

class App extends React.Component {

	componentWillMount() {
		configureAnchors({scrollDuration: 1000});
	}

	componentDidMount() {
		let rawData = ([]);
		fetch('/api/centroids', { accept: 'application/json'}).then((response) => {
			response.json().then((res) => {
				rawData = ([
					['Calories', parseFloat(res[0].Calories), parseFloat(res[1].Calories), parseFloat(res[2].Calories)],
					['Total_Fat', parseFloat(res[0].Total_Fat), parseFloat(res[1].Total_Fat), parseFloat(res[2].Total_Fat)],
					['Carbohydrates', parseFloat(res[0].Carbohydrates), parseFloat(res[1].Carbohydrates), parseFloat(res[2].Carbohydrates)],
					['Protein', parseFloat(res[0].Protein), parseFloat(res[1].Protein), parseFloat(res[2].Protein)],
					['Sugars', parseFloat(res[0].Sugars), parseFloat(res[1].Sugars), parseFloat(res[2].Sugars)],
					['Sodium', parseFloat(res[0].Sodium), parseFloat(res[1].Sodium), parseFloat(res[2].Sodium)],
					['Dietary_Fibre_g', parseFloat(res[0].Dietary_Fibre_g), parseFloat(res[1].Dietary_Fibre_g), parseFloat(res[2].Dietary_Fibre_g)],
					['Vitamin_A_re_DV', parseFloat(res[0].Vitamin_A_re_DV), parseFloat(res[1].Vitamin_A_re_DV), parseFloat(res[2].Vitamin_A_re_DV)],
					['Vitamin_C_mg_DV', parseFloat(res[0].Vitamin_C_mg_DV), parseFloat(res[1].Vitamin_C_mg_DV), parseFloat(res[2].Vitamin_C_mg_DV)],
					['Calcium_mg_DV', parseFloat(res[0].Calcium_mg_DV), parseFloat(res[1].Calcium_mg_DV), parseFloat(res[2].Calcium_mg_DV)],
					['Iron_mg_DV', parseFloat(res[0].Iron_mg_DV), parseFloat(res[1].Iron_mg_DV), parseFloat(res[2].Iron_mg_DV)],
				]);

				init(['line'], 'graph', rawData, 'Title', 'Subtitle');
			});
		});
	}

	render() {
		return (
      <div className="App">
        <NavBar />
				<div className="container">
					<div className="section-greeting">
						<ScrollableAnchor id={'greeting'}>
							<div>
								<h1>McDonald's Healthy Meal Generator</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

								<div className="row">
									<div className="col-md-offset-4 col-md-2">
										<select className="form-control">
											<option value="" disabled selected>Select your gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>

									<div className="col-md-2">
										<select className="form-control">
											<option value="" disabled selected>Select your age</option>
											<option value="infant">Less than 4 y</option>
											<option value="child">4-8 y</option>
											<option value="adult">30-35 y</option>
											<option value="elder">More than 50 y</option>
										</select>
									</div>
								</div>

								<a className="btn btn-default btn-generate" href="#meal">Generate</a>
							</div>
						</ScrollableAnchor>
					</div>

					<div className="section-meal">
						<ScrollableAnchor id={'meal'}>
							<div>
								<h1>Your Meal</h1>
								<div className="container">
									<div className="row">
										<div className="col-md-4">
											<h2 className="text-center">Breakfast</h2>
											<Menu />
											<Menu />
											<Menu />
										</div>

										<div className="col-md-4">
											<h2 className="text-center">Lunch</h2>
											<Menu />
											<Menu />
											<Menu />
										</div>

										<div className="col-md-4">
											<h2 className="text-center">Dinner</h2>
											<Menu />
											<Menu />
											<Menu />
										</div>
									</div>
								</div>
							</div>
						</ScrollableAnchor>

						<div id="graph" style={{height: '300px', padding: '10px', marginBottom: '50px'}} ></div>
					</div>
				</div>
      </div>
    );
	}
}

export default App;
