const express = require('express');
const Decimal = require('decimal.js');
const fs = require('fs');
const cors = require('cors');

//set up server with express
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

/* calculates the operations
uses decimal.js and
the callback nodeActions to work with the results
*/
const calculate = (n1, operator, n2 = 0, callback) => {
    n1 = new Decimal(n1);
    n2 = new Decimal(n2);

    // operators
    if (operator === 'add') return callback({ result: n1.plus(n2).toNumber(), calc: `${n1} + ${n2}` });
    if (operator === 'subtract') return callback({ result: n1.sub(n2).toNumber(), calc: `${n1} - ${n2}` });
    if (operator === 'multiply') return callback({ result: n1.mul(n2).toNumber(), calc: `${n1} * ${n2}` });
    if (operator === 'divide') return callback({ result: n1.div(n2).toNumber(), calc: `${n1} / ${n2}` });
    if (operator === 'percent') return callback({ result: n1.div(100).toNumber(), calc: `${n1}/100` });
    // // power of
    if (operator === 'pow') return callback({ result: n1.toPower(2).toNumber(), calc: `pow(${n1},2)` });
    if (operator === 'pow3') return callback({ result: n1.toPower(3).toNumber(), calc: `pow(${n1},3)` });
    if (operator === 'powy') return callback({ result: n1.toPower(n2).toNumber(), calc: `pow(${n1},${n2})` });
    // // square root
    if (operator === 'sqrt') return callback({ result: n1.squareRoot().toNumber(), calc: `sqrt(${n1})` });
    if (operator === 'cbrt') return callback({ result: n1.cbrt().toNumber(), calc: `cbrt(${n1})` });
    if (operator === 'nthrt') return callback({ result: n1.pow(new Decimal(1).div(n2)).toNumber(), calc: `pow(${n1}, 1 / ${n2})` });
    if (operator === 'sin') return callback({ result: n1.sin().toNumber(), calc: `sin(${n1})` });
    if (operator === 'cos') return callback({ result: n1.cos().toNumber(), calc: `cos(${n1})` });

};

//save last calculation in txt file for records
function nodeActions(data) {
    fs.appendFile('calculations.txt', `${data.calc} = ${data.result}\n`, function (err) {
        if (err) throw err;
        console.log('Last calculation saved into calculations.txt');
    });
    return data;
}

app.post('/', (req, res) => res.json(calculate(req.body.n1, req.body.operator, req.body.n2, nodeActions)));

app.get('/', (req, res) => res.send('<h1>Calculator Backend - Please make sure to use a post request<h2>'));

app.listen(port, () => console.log(`Calculator Node API listening on port ${port}!`));
