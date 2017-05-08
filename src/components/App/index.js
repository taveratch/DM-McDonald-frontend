/*eslint no-console: "off"*/
import React from 'react';
import NavBar from './nav';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Menu from './menu.js';
import ChartModal from './modal.js';
import { init } from './chart.js';
import './style.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			result: [],
			gender: '',
			age: -1,
			isSubmitted: false
		};
	}

	componentWillMount() {
		configureAnchors({scrollDuration: 1000});
	}

	handleChangeGender(e) {
		this.setState({
			gender: e.target.value,
		});
	}

	handleChangeAge(e) {
		this.setState({
			age: e.target.value,
		});
	}

	onSubmit() {
		let rawData = ([]);
		fetch('/api/user/result?gender=' + this.state.gender + '&age=' + this.state.age, { accept: 'application/json'}).then((response) => {
			response.json().then((result) => {
				fetch('/api/centroids', { accept: 'application/json'}).then((response) => {
					response.json().then((res) => {
						rawData = ([
							['Calories', parseFloat(res[0].Calories), parseFloat(res[1].Calories), parseFloat(res[2].Calories), parseFloat(result.user_centroid.Calories)],
							['Total_Fat', parseFloat(res[0].Total_Fat), parseFloat(res[1].Total_Fat), parseFloat(res[2].Total_Fat), parseFloat(result.user_centroid.Total_Fat)],
							['Carbohydrates', parseFloat(res[0].Carbohydrates), parseFloat(res[1].Carbohydrates), parseFloat(res[2].Carbohydrates), parseFloat(result.user_centroid.Carbohydrates)],
							['Protein', parseFloat(res[0].Protein), parseFloat(res[1].Protein), parseFloat(res[2].Protein), parseFloat(result.user_centroid.Protein)],
							['Sugars', parseFloat(res[0].Sugars), parseFloat(res[1].Sugars), parseFloat(res[2].Sugars), parseFloat(result.user_centroid.Sugars)],
							['Sodium', parseFloat(res[0].Sodium), parseFloat(res[1].Sodium), parseFloat(res[2].Sodium), parseFloat(result.user_centroid.Sodium)],
							['Dietary_Fibre_g', parseFloat(res[0].Dietary_Fibre_g), parseFloat(res[1].Dietary_Fibre_g), parseFloat(res[2].Dietary_Fibre_g), parseFloat(result.user_centroid.Dietary_Fibre_g)],
							['Vitamin_A_re_DV', parseFloat(res[0].Vitamin_A_re_DV), parseFloat(res[1].Vitamin_A_re_DV), parseFloat(res[2].Vitamin_A_re_DV), parseFloat(result.user_centroid.Vitamin_A_re_DV)],
							['Vitamin_C_mg_DV', parseFloat(res[0].Vitamin_C_mg_DV), parseFloat(res[1].Vitamin_C_mg_DV), parseFloat(res[2].Vitamin_C_mg_DV), parseFloat(result.user_centroid.Vitamin_C_mg_DV)],
							['Calcium_mg_DV', parseFloat(res[0].Calcium_mg_DV), parseFloat(res[1].Calcium_mg_DV), parseFloat(res[2].Calcium_mg_DV), parseFloat(result.user_centroid.Calcium_mg_DV)],
							['Iron_mg_DV', parseFloat(res[0].Iron_mg_DV), parseFloat(res[1].Iron_mg_DV), parseFloat(res[2].Iron_mg_DV), parseFloat(result.user_centroid.Iron_mg_DV)],
						]);

						init(['line'], 'graph', rawData, 'Title', 'Subtitle');

						this.setState({
							result: result,
							isSubmitted: true
						});

					});
				});
			});
		});
	}

	render() {
		return (
      <div className="App">
        <NavBar />
				<div className="section-greeting">
					<div>
						<ScrollableAnchor id={'greeting'}>
							<div>
								<h1>McDonald's Healthy Meal Generator</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

								<div className="container">
									<div className="col-md-offset-4 col-md-2">
										<select className="form-control" ref="gender" onChange={ this.handleChangeGender.bind(this) }>
											<option value="" disabled selected>Select your gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>

									<div className="col-md-2">
										<input type="number" className="form-control" ref="age" min="1" max="107" placeholder="Select your age" onChange={ this.handleChangeAge.bind(this) } />
									</div>
								</div>

								<a className="btn btn-default btn-generate" href="#meal"
									disabled={ this.state.gender == '' || this.state.age < 0 } onClick={ this.onSubmit.bind(this) }>Generate</a>
							</div>
						</ScrollableAnchor>
					</div>

					{ this.state.isSubmitted &&
						<div className="section-meal">
							<ScrollableAnchor id={'meal'}>
								<div>
									<h1>Your Meal</h1>
									<div className="container">
										<div className="row">
											<div className="col-md-4">
												<h2 className="text-center">Breakfast</h2>
												<div className="menu-list">
													<Menu item={ this.state.result.picked.breakfast[parseInt(Math.random() * this.state.result.picked.breakfast.length)] } />
													<Menu item={ this.state.result.picked.breakfast[parseInt(Math.random() * this.state.result.picked.breakfast.length)] } />
												</div>
											</div>

											<div className="col-md-4">
												<h2 className="text-center">Lunch</h2>
												<div className="menu-list">
													<Menu item={ this.state.result.picked.lunch[parseInt(Math.random() * this.state.result.picked.lunch.length)] } />
													<Menu item={ this.state.result.picked.lunch[parseInt(Math.random() * this.state.result.picked.lunch.length)] } />
												</div>
											</div>

											<div className="col-md-4">
												<h2 className="text-center">Dinner</h2>
												<div className="menu-list">
													<Menu item={ this.state.result.picked.dinner[parseInt(Math.random() * this.state.result.picked.dinner.length)] } />
													<Menu item={ this.state.result.picked.dinner[parseInt(Math.random() * this.state.result.picked.dinner.length)] } />
												</div>
											</div>
										</div>
									</div>
									<div id="graph" style={{height: '300px'}} ></div>
								</div>
							</ScrollableAnchor>
						</div>
					}
				</div>
      </div>
    );
	}
}

export default App;
