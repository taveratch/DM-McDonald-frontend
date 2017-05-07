/*eslint no-console: "off"*/
const _ = require('lodash');


function getMaxMin(dataset, headers) {
	let inside = {
		'max': Number.MIN_SAFE_INTEGER,
		'min': Number.MAX_SAFE_INTEGER
	};

	let res = {};
	_.forEach(headers, (value) => {
		res[value] = _.cloneDeep(inside);
	});

	_.forEach(dataset, (data) => {
		_.forEach(headers, (header) => {
			let headerMax = res[header].max;
			let headerMin = res[header].min;
			let value = parseFloat(data[header]);
			res[header].max = value > headerMax ? value : headerMax;
			res[header].min = value < headerMin ? value : headerMin;
		});
	});
	return res;
}
module.exports = {
	normalize: (dataset, facts) => {
		let headers = ['Protein', 'Total_Fat', 'Carbohydrates', 'Sugars', 'Sodium', 'Dietary_Fibre_g', 'Vitamin_C_mg_DV', 'Vitamin_A_re_DV', 'Calcium_mg_DV', 'Iron_mg_DV'];
		let maxMin = getMaxMin(dataset, headers);
		let res = {};
		_.forEach(maxMin, (value, key) => {
			res[key] = (facts[key] - value.min) / (value.max - value.min);
		});
		return res;
	}
};
