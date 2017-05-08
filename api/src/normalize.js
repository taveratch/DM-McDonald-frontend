/*eslint no-console: "off"*/
const _ = require('lodash');

let headers = ['Protein', 'Total_Fat', 'Carbohydrates', 'Sugars', 'Sodium', 'Dietary_Fibre_g', 'Vitamin_C_mg_DV', 'Vitamin_A_re_DV', 'Calcium_mg_DV', 'Iron_mg_DV'];
const NUMBER_OF_CLUSTER = 3;

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
		let maxMin = getMaxMin(dataset, headers);
		let res = {};
		_.forEach(maxMin, (value, key) => {
			res[key] = (facts[key] - value.min) / (value.max - value.min);
		});
		return res;
	},

  /*
    Get catagories which are match with a cluster.
  */
	getCluster: (centroids, userCentroid) => {
		let clusters = {};
    // initiate clusters object.
    // { "cluster_0" : ['Protein', ...] , }
		_.times(NUMBER_OF_CLUSTER, (n) => {
			clusters[`cluster_${n}`] = [];
		});

		_.forEach(headers, (header) => {
			let min = Number.MAX_SAFE_INTEGER;
			let cluster = '';
			_.forEach(centroids, (centroid) => {
				let diff = Math.abs(parseFloat(centroid[header]) - parseFloat(userCentroid[header]));
				if(diff < min) {
					min = diff;
					cluster = centroid['cluster'];
				}
			});
			clusters[cluster].push(header);
		});

		return clusters;
	},

  /*
    Get the most suitable cluster name along with matched point and total point.
  */
	getClusterName: (clusters) => {
		let clusterName = '';
		let max = Number.MIN_SAFE_INTEGER;

		_.forEach(clusters, (value, key) => {
			if(value.length > max) {
				max = value.length;
				clusterName = key;
			}
		});

		return {
			'cluster_name' : clusterName,
			'matched_point' : max,
			'total_point' : headers.length
		};
	}
};
