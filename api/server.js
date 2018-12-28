const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.post('/', function (req, res) {
    // let r = JSON.parse(req.body);
    console.log(req.body.n1);
    let result = 9;

    return res.json(result);
});

app.get('/', (req, res) => res.send('<h1>Calculator Backend<h2>'))

app.listen(port, () => console.log(`Calc app listening on port ${port}!`))
