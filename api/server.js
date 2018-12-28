const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/', function (req, res) {
    //console.log(req.body);      // your JSON
    return res.json(req.body.n1);
});

app.get('/', (req, res) => res.send('<h1>Calculator Backend<h2>'))

app.listen(port, () => console.log(`Calc app listening on port ${port}!`))
