'use strict';

window.$ = window.jQuery = require('jquery'); // add jquery

/*
Define all calculator parts for reference
*/
const calculator = $('#calculator');
const display = $('#calculator .display');
const keys = $('button');
const clearButton = $('button[data-action=clear]');
const history = $('#history');

/*
Passes all calculations to the nodejs api
via ajax post and creates a promise
*/
const calculate = (n1, operator, n2) => {

    const request = {
        n1: n1,
        n2: n2,
        operator: operator
    };

    const result = $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://localhost:3001',
        async: false,
        dataType: 'json',
        data: request,
        success: function (data) {
            history.prepend(`<li>${data.calc} = ${data.result}</li>`);
        }
    });
    return result;
};

const createResultString = (value) => {
    if(value === null) {
        display.text('NaN');
        return;
    }
    display.text(value);
};

/* Add the click event listener for all buttons */
keys.on('click', e => {
    const key = $(e.target); // make target a jQuery instance
    const action = key.attr('data-action'); // if exists get the data-action attribute from the button
    const keyContent = key.text(); // value of the pressed key
    const displayedNum = display.text(); // value of the display
    const previousKeyType = calculator.data('previousKeyType'); // memorize the previous key type

    // Remove .is-pressed class from all keys
    keys.removeClass('is-pressed');

    if (!action) { // number keys
        if (
            displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            createResultString(keyContent);
        } else {
            createResultString(displayedNum + keyContent);
        }
        calculator.data('previousKeyType', 'number');
    }

    if ( // operators
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide' ||
        action === 'powy' ||
        action === 'nthrt'
    ) {
        const firstValue = calculator.data('firstValue');
        const operator = calculator.data('operator');
        const secondValue = displayedNum;

        // Note: It's sufficient to check for firstValue and operator because secondValue always exists
        if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) {
            calculate(firstValue, operator, secondValue)
                .then(function (data) {
                    const calcValue = data.result;
                    createResultString(calcValue);
                    calculator.data('firstValue', calcValue);
                });
        } else {
            calculator.data('firstValue', displayedNum);
        }
        key.addClass('is-pressed'); // used to style operators
        calculator.data('previousKeyType', 'operator');
        calculator.data('operator', action);
    }

    if (
        action === 'pow' ||
        action === 'pow3' ||
        action === 'sqrt' ||
        action === 'cbrt'
    ) {
        calculate(displayedNum, action)
            .then((data) => {
                const calcValue = data.result;
                createResultString(calcValue);
                calculator.data('firstValue', calcValue);
            });

        calculator.data('previousKeyType', 'operator');
        calculator.data('operator', action);
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            createResultString(displayedNum + '.');
        } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            createResultString('0.');
        }
        calculator.data('previousKeyType', 'decimal');
    }

    if (action === 'clear') {
        if (key.text() === 'AC') {
            calculator.data('firstValue', '');
            calculator.data('modValue', '');
            calculator.data('operator', '');
            calculator.data('previousKeyType', '');
        } else {
            key.text('AC');
            calculator.data('firstValue', '');
            calculator.data('modValue', '');
            calculator.data('operator', '');
            calculator.data('previousKeyType', '');
        }
        createResultString(0);
        calculator.data('previousKeyType', 'clear');
    }

    if (action === 'calculate') {
        let firstValue = calculator.data('firstValue');
        const operator = calculator.data('operator');
        let secondValue = displayedNum;
        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = calculator.data('modValue');
            }
            calculate(firstValue, operator, secondValue)
                .then(function (data) {
                    createResultString(data.result);// v1 is undefined
                });
        }
        // Set modValue attribute
        calculator.data('modValue', secondValue);
        calculator.data('previousKeyType', 'calculate');
    }

    if (action !== 'clear') {
        clearButton.text('CE');
    }
});
