const express = require('express');
const Decimal = require('decimal.js');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) { // middleware for CORS headers
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* calculates the operations
uses decimal.js and
the callback nodeActions to work with the results
*/
const calculate = (n1, operator, n2 = 0, callback) => {
    n1 = new Decimal(n1);
    n2 = new Decimal(n2);

    // operators
    // if (operator === 'add') return { result: precision(n1 + n2), calc: `${n1} + ${n2}` };
    if (operator === 'add') return callback({ result: n1.plus(n2).toNumber(), calc: `${n1} + ${n2}` });
    // if (operator === 'subtract') return { result: precision(n1 - n2), calc: `${n1} - ${n2}` };
    if (operator === 'subtract') return callback({ result: n1.sub(n2).toNumber(), calc: `${n1} - ${n2}` });
    // // if (operator === 'multiply') return { result: precision(n1 * n2), calc: `${n1} * ${n2}` };
    if (operator === 'multiply') return callback({ result: n1.mul(n2).toNumber(), calc: `${n1} * ${n2}` });
    // // if (operator === 'divide') return { result: precision(n1 / n2), calc: `${n1} / ${n2}` };
    if (operator === 'divide') return callback({ result: n1.div(n2).toNumber(), calc: `${n1} / ${n2}` });
    // // power of
    // // if (operator === 'pow') return { result: precision(Math.pow(n1, 2)), calc: `Math.pow(${n1},2)` };
    if (operator === 'pow') return callback({ result: n1.toPower(2).toNumber(), calc: `pow(${n1},2)` });
    if (operator === 'pow3') return callback({ result: n1.toPower(3).toNumber(), calc: `pow(${n1},3)` });
    if (operator === 'powy') return callback({ result: n1.toPower(n2).toNumber(), calc: `pow(${n1},${n2})` });
    // // if (operator === 'pow3') return { result: precision(Math.pow(n1, 3)), calc: `Math.pow(${n1},3)` };
    // // if (operator === 'powy') return { result: precision(Math.pow(n1, n2)), calc: `Math.pow(${n1},${n2})` };
    // // square root
    // // if (operator === 'sqrt') return { result: precision(Math.sqrt(n1)), calc: `Math.sqrt(${n1})` };
    if (operator === 'sqrt') return callback({ result: n1.squareRoot().toNumber(), calc: `sqrt(${n1})` });
    // // if (operator === 'cbrt') return { result: precision(Math.cbrt(n1)), calc: `Math.cbrt(${n1})` };
    if (operator === 'cbrt') return callback({ result: n1.cbrt().toNumber(), calc: `cbrt(${n1})` });
    // // if (operator === 'nthrt') return { result: precision(Math.pow(n1, 1 / n2)), calc: `Math.pow(${n1}, 1 / ${n2})` };
    if (operator === 'nthrt') return callback({ result: n1.pow(new Decimal(1).div(n2)).toNumber(), calc: `pow(${n1}, 1 / ${n2})` });

};

function nodeActions(data) {
    fs.appendFile('calculations.txt', `${data.calc} = ${data.result}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return data;
}

// const precision = (result) => {
//     return Math.round(1e12 * result) / 1e12;
// };

app.post('/', (req, res) => res.json(calculate(req.body.n1, req.body.operator, req.body.n2, nodeActions)));

app.get('/', (req, res) => res.send('<h1>Calculator Backend<h2>'));

app.listen(port, () => console.log(`Calc app listening on port ${port}!`));
