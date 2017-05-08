const _ = require('lodash');

/*
  Get the specific meal based on catagory in a cluster.
  Such as get only breakfast.

  @return : a list of meal which contains only breakfast.
*/


function getSpecificMeal(meal, category) {
	return _.filter(meal, (o) => _.lowerCase(o['Category']) === _.lowerCase(category));
}

function getMealFromClusterName(data, cluster) {
	return _.filter(_.toArray(data), (o) => o['cluster'] === cluster['cluster_name']);
}

module.exports = {
	pick: (food, category, userFact, cluster) => {
		let meal = getMealFromClusterName(food, cluster);
		let mealFromCategory = getSpecificMeal(meal, category);

		console.log(mealFromCategory);
		return {};
	},
};
