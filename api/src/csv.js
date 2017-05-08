/*global someFunction __dirname:true*/
/*eslint no-console: "off"*/
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const normalize = require('./normalize.js');
const foodPicker = require('./food-picker.js');
const _ = require('lodash');
const csvAPI = express();

const GENDERS = ['male', 'female'];

let readCSV = (file) => {
	let results = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => { results.push(data); })
    .on('end', () => { resolve(results); });
	});

};

csvAPI.get('/data', async (req, res) => {
	console.log('Getting data');

	let file = __dirname + '/data/menu.csv';
	let results = await readCSV(file);

	res.send(results);
});

csvAPI.get('/facts', async (req, res) => {
	console.log('Getting facts');

	let gender = _.lowerCase(req.query['gender']) || 'male';
	gender = _.includes(GENDERS, gender) ? gender : 'male'; //Verify the input

	let age = parseInt(req.query['age']) || 20;

	let file = __dirname + `/data/facts-${gender}.csv`;
	let facts = await readCSV(file);

	let factFromAge = findFactFromAge(facts, age);

	res.send(factFromAge);
});

csvAPI.get('/centroids', async (req, res) => {
	console.log('Getting Centroids');

	let file = __dirname + '/data/centroids.csv';
	let results = await readCSV(file);

	res.send(results);
});

csvAPI.get('/user/result', async (req, res) => {
	console.log('Getting user centroid');

	let gender = _.lowerCase(req.query['gender']) || 'male'; //male by default
	gender = _.includes(GENDERS, gender) ? gender : 'male'; //Verify the input, male by default
	let age = parseInt(req.query['age']) || 20;
	let category = _.lowerCase(req.query['category']) || 'breakfast';

	let dataLocation = __dirname + '/data/menu.csv';
	let factsLocation = __dirname + `/data/facts-${gender}.csv`;
	let centroidsLocation = __dirname + '/data/centroids.csv';
	let foodWithClusterLocation = __dirname + '/data/results-with-cluster.csv';
	let results = await readCSV(dataLocation);
	let facts = await readCSV(factsLocation);
	let centroids = await readCSV(centroidsLocation);
	let foodWithCluster = await readCSV(foodWithClusterLocation);

	let fact = findFactFromAge(facts, age);

	let userCentroid = normalize.normalize(results, fact); // male
	let cluster = normalize.getCluster(centroids, userCentroid);
	let clusterName = normalize.getClusterName(cluster);

	let pickedMeal = foodPicker.pick(foodWithCluster, category, fact, clusterName);

	res.send({ 'user_centroid' : userCentroid, 'cluster' : cluster, 'name' : clusterName });
});

csvAPI.get('/user/pick', async (req, res) => {
	console.log('Getting user suitable foods');


});

function findFactFromAge(facts, age) {
	return _.find(facts, (o) => parseInt(o['Age']) === age);
}

module.exports = csvAPI;
