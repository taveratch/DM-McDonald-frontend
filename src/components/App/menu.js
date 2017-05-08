import React from 'react';
import image from '../../assets/img/test.png';

class Menu extends React.Component {

	render() {
		return (
      <div className="media">
        <div className="media-left">
          <img src={ image } className="media-object" style={{width: '60px'}} />
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
