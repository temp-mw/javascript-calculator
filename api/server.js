const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const calculate = (n1, operator, n2 = '') => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    // let's not use eval(firstNum + secondNum)
    // operators
    if (operator === 'add') return precision(firstNum + secondNum);
    if (operator === 'subtract') return precision(firstNum - secondNum);
    if (operator === 'multiply') return precision(firstNum * secondNum);
    if (operator === 'divide') return precision(firstNum / secondNum);
    // functions
    if (operator === 'pow') return precision(Math.pow(firstNum, 2));
    if (operator === 'pow3') return precision(Math.pow(firstNum, 3));
    if (operator === 'powy') return precision(Math.pow(firstNum, secondNum));

    if (operator === 'sqrt') return precision(Math.sqrt(firstNum));
    if (operator === 'cbrt') return precision(Math.cbrt(firstNum));
    if (operator === 'nthrt') return precision(Math.pow(firstNum, 1 / secondNum));

};

const precision = (result) => {
    return Math.round(1e12 * result) / 1e12;
};

app.post('/', function (req, res) {
    return res.json(calculate(req.body.n1, req.body.operator, req.body.n2));
});

app.get('/', (req, res) => res.send('<h1>Calculator Backend<h2>'));

app.listen(port, () => console.log(`Calc app listening on port ${port}!`));
