const _ = require('lodash');

/*
  Get the specific meal based on catagory in a cluster.
  Such as get only breakfast.

  @return : a list of meal which contains only breakfast.
*/

const BREAKFAST = 'breakfast';
const LUNCH = 'lunch';
const DINNER = 'dinner';

/* List of categories that should be chosen in each meal.*/
let categories = {
	'breakfast' : ['breakfast', 'coffee & tea'],
	'lunch' : ['beef & pork', 'snacks & sides', 'beverages', 'smoothies & shakes'],
	'dinner' : ['chicken & fish', 'salads', 'desserts', 'beverages', 'coffee & tea', 'smoothies & shakes']
};

/*
	Get meal randomly from calories per meal.
*/
function getSpecificMeal(meal, category, caloriesPerMeal) {
	let cate = _.pick(categories, [category])[category];
	let picked = [];
	let timeout = 10;
	while(caloriesPerMeal > 0) {
		let randCategoryIndex = Math.floor(Math.random()* cate.length); // Random index of category.
		let pickedCategory = cate[randCategoryIndex]; // Pick category randomly.
		let pickedCategoryArr = _.filter(meal, (o) => o['Category'].toLowerCase() === pickedCategory); // Get food from random picked category.
		if( _.isEmpty(pickedCategoryArr)) { //if there is no food in this category.
			if(timeout === 0) { return; } //if found no food more than 10 times then exit.
			timeout--; // otherwise, decrease a counter and continue finding.
			continue;
		}
		let randFoodIndex = Math.floor(Math.random() * pickedCategoryArr.length); //Pick food randomly.
		let pickedFood = pickedCategoryArr[randFoodIndex];
		_.remove(meal, (o) => o['Id'] === pickedFood['Id']);
		picked.push(pickedFood); //Add picked food to result.
		caloriesPerMeal -= pickedFood['Calories']; // decrease the calories per meal.
	}
	return picked;
}

/*
	Get list of meal from selected cluster.
*/
function getMealFromClusterName(data, cluster) {
	return _.filter(_.toArray(data), (o) => o['cluster'] === cluster['cluster_name']);
}

/*
	Sort the meal list by calories (Max to Min). Preparing data to be picked.
*/
function sortByCalories(meal) {
	let arr = _.toArray(meal);
	return _.sortBy(arr, [(o) => o['Calories']]);
}

module.exports = {
	pick: (food, userFact, cluster) => {
		let meal = getMealFromClusterName(food, cluster);
		let totalCalories = parseInt(userFact['Calories']);
		let caloriesPerMeal = totalCalories/3;
		let mealByCalories = sortByCalories(meal);
		let breakfast = getSpecificMeal(mealByCalories, 'breakfast', caloriesPerMeal);
		let lunch = getSpecificMeal(mealByCalories, 'lunch', caloriesPerMeal);
		let dinner = getSpecificMeal(mealByCalories, 'dinner', caloriesPerMeal);
		return {breakfast, lunch, dinner};
	},
};
