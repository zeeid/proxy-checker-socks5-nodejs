// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const checker = require('./checker');

// Fungsi untuk mengonversi milidetik ke format waktu (detik dan menit)
function formatElapsedTime(time) {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes > 0) {
        return `${minutes} minute(s)`;
    } else {
        return `${seconds} second(s)`;
    }
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { results: null, elapsedTime: null, formatElapsedTime });
});

app.post('/', async (req, res) => {
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

    // Perform proxy check using checker.js asynchronously
    const startTime = new Date();
    const results = await checker.checkProxies();
    const endTime = new Date();
    const elapsedTime = endTime - startTime;

    // Render the results on the webpage
    res.render('index', { results, elapsedTime, formatElapsedTime });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
