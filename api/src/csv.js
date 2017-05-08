/*global someFunction __dirname:true*/
/*eslint no-console: "off"*/
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const normalize = require('./normalize.js');
const _ = require('lodash');
const csvAPI = express();

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
	let file = __dirname + '/data/facts.csv';
	let results = await readCSV(file);
	res.send(results);
});

csvAPI.get('/centroids', async (req, res) => {
	console.log('Getting Centroids');
	let file = __dirname + '/data/centroids.csv';
	let results = await readCSV(file);
	res.send(results);
});

csvAPI.get('/user/centroid', async (req, res) => {
	console.log('Getting user centroid');
	let sex = req.query['sex'] || 'male'; //male by default
	let age = parseInt(req.query['age']) || 20;
	let dataLocation = __dirname + '/data/menu.csv';
	let factsLocation = __dirname + `/data/facts-${sex}.csv`;
	let centroidsLocation = __dirname + '/data/centroids.csv';
	let results = await readCSV(dataLocation);
	let facts = await readCSV(factsLocation);
	let centroids = await readCSV(centroidsLocation);
	let fact = findFactFromAge(facts, age);
	let userCentroid = normalize.normalize(results, fact); // male
	let cluster = normalize.getCluster(centroids, userCentroid);
	let clusterName = normalize.getClusterName(cluster);
	res.send({ 'user_centroid' : userCentroid, 'cluster' : cluster, 'name' : clusterName });
});

function findFactFromAge(facts, age) {
	return _.find(facts, (o) => parseInt(o['Age']) === age);
}

module.exports = csvAPI;
