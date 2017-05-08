const _ = require('lodash');

/*
  Get the specific meal based on catagory in a cluster.
  Such as get only breakfast.

  @return : a list of meal which contains only breakfast.
*/

let categories = {
	'breakfast' : ['breakfast', 'coffee & tea'],
	'lunch' : ['beef & pork', 'snacks & sides', 'beverages', 'smoothies & shakes'],
	'dinner' : ['chicken & fish', 'salads', 'desserts', 'beverages', 'coffee & tea', 'smoothies & shakes']
};

function getSpecificMeal(meal, category) {
	let cate = categories[category];
	return _.filter(meal, (o) => _.includes(cate, o['Category'].toLowerCase()));
}

function getMealFromClusterName(data, cluster) {
	return _.filter(_.toArray(data), (o) => o['cluster'] === cluster['cluster_name']);
}

module.exports = {
	pick: (food, category, userFact, cluster) => {
		let meal = getMealFromClusterName(food, cluster);
    // console.log(meal);
		let mealFromCategory = getSpecificMeal(meal, category);

		return mealFromCategory;
	},
};
