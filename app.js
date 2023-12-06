// app.js

const express = require('express');
const app = express();
const checker = require('./checker');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const result = checker.checkProxy();
    res.render('index', { result });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
