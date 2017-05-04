import React from 'react';
import NavBar from './nav';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import './style.css';

class App extends React.Component {

	componentWillMount() {
		configureAnchors({scrollDuration: 1000});
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
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
										</div>

										<div className="col-md-4">
											<h2 className="text-center">Lunch</h2>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
										</div>

										<div className="col-md-4">
											<h2 className="text-center">Dinner</h2>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
											<div className="media">
												<div className="media-left">
													<img src="https://www.w3schools.com/bootstrap/img_avatar1.png" className="media-object" style={{width: '60px'}} />
												</div>
												<div className="media-body">
													<h4 className="media-heading">Left-aligned</h4>
													<p>Lorem ipsum dolor sit amet</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</ScrollableAnchor>
					</div>
				</div>
      </div>
    );
	}
}

export default App;
