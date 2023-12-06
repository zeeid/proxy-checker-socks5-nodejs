// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const checker = require('./checker');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { results: null });
});

app.post('/', (req, res) => {
    const { proxyList, socksUsername, socksPassword } = req.body;

    // Parse proxyList into an array of proxies
    const proxies = proxyList.split('\n').map(proxy => {
        const [hostname, port] = proxy.split(':');
        return {
            hostname,
            port: parseInt(port),
            username: socksUsername,
            password: socksPassword,
        };
    });

    // Set proxy details in checker.js
    checker.setProxyDetailsArray(proxies);

    // Perform proxy check using checker.js
    const results = checker.checkProxies();

    // Render the results on the webpage
    res.render('index', { results });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
