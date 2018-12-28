'use strict';

window.$ = window.jQuery = require('jquery');

/*
To be performed by nodejs via ajax/json
*/
const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        //the url where you want to sent the userName and password to
        url: 'http://localhost:3001',
        dataType: 'json',
        // async: false,
        //json object to sent to the authentication url
        data: '{"n1": "' + firstNum + '", "n2" : "' + secondNum + '"}',
        success: function (data) {
            console.log(data);
        }
    });


    // let's not use eval(firstNum + secondNum)
    if (operator === 'add') return precision(firstNum + secondNum);
    if (operator === 'subtract') return precision(firstNum - secondNum);
    if (operator === 'multiply') return precision(firstNum * secondNum);
    if (operator === 'divide') return precision(firstNum / secondNum);


};

const precision = (result) => {
    return Math.round(1e12 * result) / 1e12;
};

/*
Define the calculator parts (calulator, display and keys)
*/
const calculator = $('#calculator');
const display = $('#calculator .display');
const keys = $('#calculator .keys');
const clearButton = keys.find('button[data-action=clear]');


/* Add the click event listener for all keys */
keys.on('click', e => {
    if (e.target.matches('button')) {
        const key = $(e.target); // make target a jQuery object
        const action = key.attr('data-action'); // if exists get the data-action attribute from the button
        const keyContent = key.text(); // value of the pressed key
        const displayedNum = display.text(); // value of the display
        const previousKeyType = calculator.data('previousKeyType'); // memorize the previous key type

        // Remove .is-pressed class from all keys
        keys.find('button').removeClass('is-pressed');

        if (!action) { // number keys
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.text(keyContent);
            } else {
                display.text(displayedNum + keyContent);
            }
            calculator.data('previousKeyType', 'number');
        }

        if ( // operators
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
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
                const calcValue = calculate(firstValue, operator, secondValue);
                display.text(calcValue);

                // Update firstValue to calculated value
                calculator.data('firstValue', calcValue);
            } else {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.data('firstValue', displayedNum);
            }

            key.addClass('is-pressed'); // used to style operators

            calculator.data('previousKeyType', 'operator');
            calculator.data('operator', action);
        }

        if (action === 'decimal') {
            // Do nothing if string has a dot
            if (!displayedNum.includes('.')) {
                display.text(displayedNum + '.');
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.text('0.');
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

            display.text(0);
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

                display.text(calculate(firstValue, operator, secondValue));
            }
            // Set modValue attribute
            calculator.data('modValue', secondValue);
            calculator.data('previousKeyType', 'calculate');
        }

        if (action !== 'clear') {
            clearButton.text('CE');
        }

    }
});
