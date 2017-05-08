/*eslint no-console: "off"*/
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.use('/api', require('./csv.js'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
