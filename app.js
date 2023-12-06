// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const checker = require('./checker');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { result: null });
});

app.post('/', (req, res) => {
    const { socksDetails, socksUsername, socksPassword } = req.body;

    // Parse socksDetails into hostname and port
    const [hostname, port] = socksDetails.split(':');

    // Set proxy details in checker.js
    checker.setProxyDetails(hostname, parseInt(port), socksUsername, socksPassword);

    // Perform proxy check using checker.js
    const result = checker.checkProxy();

    // Render the result on the webpage
    res.render('index', { result });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
