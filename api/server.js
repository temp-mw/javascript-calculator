const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) { // add headers for CORS
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const calculate = (n1, operator, n2 = '') => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    // operators
    if (operator === 'add') return { result: precision(firstNum + secondNum), calc: `${firstNum} + ${secondNum}` };
    if (operator === 'subtract') return { result: precision(firstNum - secondNum), calc: `${firstNum} - ${secondNum}` };
    if (operator === 'multiply') return { result: precision(firstNum * secondNum), calc: `${firstNum} * ${secondNum}` };
    if (operator === 'divide') return { result: precision(firstNum / secondNum), calc: `${firstNum} / ${secondNum}` };
    // power of
    if (operator === 'pow') return { result: precision(Math.pow(firstNum, 2)), calc: `Math.pow(${firstNum},2)` };
    if (operator === 'pow3') return { result: precision(Math.pow(firstNum, 3)), calc: `Math.pow(${firstNum},3)` };
    if (operator === 'powy') return { result: precision(Math.pow(firstNum, secondNum)), calc: `Math.pow(${firstNum},${secondNum})` };
    // square root
    if (operator === 'sqrt') return { result: precision(Math.sqrt(firstNum)), calc: `Math.sqrt(${firstNum})` };
    if (operator === 'cbrt') return { result: precision(Math.cbrt(firstNum)), calc: `Math.cbrt(${firstNum})` };
    if (operator === 'nthrt') return { result: precision(Math.pow(firstNum, 1 / secondNum)), calc: `Math.pow(${firstNum}, 1 / ${secondNum})` };
};

const precision = (result) => {
    return Math.round(1e12 * result) / 1e12;
};

app.post('/', (req, res) => res.json(calculate(req.body.n1, req.body.operator, req.body.n2)));

app.get('/', (req, res) => res.send('<h1>Calculator Backend<h2>'));

app.listen(port, () => console.log(`Calc app listening on port ${port}!`));
