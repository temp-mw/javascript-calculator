const express = require('express');
const Decimal = require('decimal.js');
const fs = require('fs');
const cors = require('cors');
// require("./instrumentation1.js");

//set up server with express
const app = express();

const port = process.env.PORT || 3001;
// const Sentry = require("@sentry/node");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
const tracker = require('@middleware.io/node-apm');

/* calculates the operations
uses decimal.js and
the callback nodeActions to work with the results
*/
const calculate = (n1, operator, n2 = 0, callback) => {
    n1 = new Decimal(n1);
    n2 = new Decimal(n2);

    // operators1111
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

app.get('/error', function (req, res) {
    console.log("error......")
    try{
        throw new Error('oh error!11');
    }catch (e) {
        tracker.errorRecord(e)
        // res.end(res.sentry + "\n");
    }
    res.status(500).send("wrong");
});

app.get('/reference-error', (req, res) => {
    try {
        let x = nonexistentVar;
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("Reference Error occurred");
    }
});

app.get('/zero-division-error', (req, res) => {
    try {
        let x = 10 / 0;
        if (!isFinite(x)) throw new Error("Zero Division Error");
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("Zero Division Error occurred");
    }
});

app.get('/type-error', (req, res) => {
    try {
        null.f();
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("Type Error occurred");
    }
});

app.get('/out-of-memory', (req, res) => {
    try {
        let arr = [];
        while (true) arr.push(1);
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("Out of Memory Error occurred");
    }
});

app.get('/http-exception', (req, res) => {
    try {
        fetch('https://invalid.url').then(response => response.json());
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("HTTP Request Exception occurred");
    }
});

app.get('/handled-exception', (req, res) => {
    try {
        throw new Error("Handled Exception");
    } catch (e) {
        tracker.errorRecord(e);
        res.status(200).send("Handled Exception captured successfully");
    }
});

app.get('/key-error', (req, res) => {
    try {
        let obj = {};
        let value = obj.undefinedKey.prop;
    } catch (e) {
        tracker.errorRecord(e);
        res.status(500).send("Key Error occurred");
    }
});

// app.get("/debug-sentry", function mainHandler(req, res) {
//     throw new Error("My first Sentry error!");
// });

app.post('/', (req, res) => res.json(calculate(req.body.n1, req.body.operator, req.body.n2, nodeActions)));

app.get('/', (req, res) => res.send('<h1>Calculator Backend - Please make sure to use a post request<h2>'));

// Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(port, () => console.log(`Calculator Node API listening on port ${port}!`));
