import React from 'react';
import breakfast from '../../assets/img/breakfast.png';
import beef from '../../assets/img/beef.png';
import chicken from '../../assets/img/chicken.png';
import coffee from '../../assets/img/coffee.png';
import dessert from '../../assets/img/dessert.png';
import salad from '../../assets/img/salad.png';
import smoothie from '../../assets/img/smoothie.png';
import snack from '../../assets/img/snack.png';

class Menu extends React.Component {

	constructor() {
		super();
		this.state = {
			images: {
				'Breakfast': breakfast,
				'Chicken & Fish': chicken,
				'Coffee & Tea': coffee,
				'Desserts': dessert,
				'Beef & Pork': beef,
				'Salads': salad,
				'Smoothies & Shakes': smoothie,
				'Snacks & Sides': snack,
			}
		};
	}

	render() {
		return (
      <div className="media">
        <div className="media-left">
          <img src={ this.state.images[this.props.item.Category] } className="media-object" style={{width: '60px'}} />
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ this.props.item.Item }</h4>
          <p>{ this.props.item.Category } ({ parseInt(this.props.item.Calories) } Cal)</p>
        </div>
      </div>
    );
	}
}

export default Menu;
