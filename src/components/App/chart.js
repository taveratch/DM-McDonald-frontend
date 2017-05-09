/*eslint no-console: "off"*/
export const init = (type, eleId, rawData, title, subtitle) => {
	window.google.charts.load('current', { packages: ['corechart', 'line'] });
	window.google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = new window.google.visualization.DataTable();
		data.addColumn('string', 'Nutrients');
		data.addColumn('number', 'Group 1');
		data.addColumn('number', 'Group 2');
		data.addColumn('number', 'Group 3');
		data.addColumn('number', 'You');
		data.addRows(rawData);

		var options = {
			chart: {
				title: title,
				subtitle: subtitle
			},
			height: 500
		};

		var chart = new window.google.charts.Line(document.getElementById(eleId));

		chart.draw(data, options);
	}
};
