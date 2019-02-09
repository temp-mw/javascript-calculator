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
const debug = true;

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
        dataType: 'json',
        data: request,
        success: function (data) {
            history.prepend(`<li>${data.calc} = ${data.result}</li>`);
        }
    });
    return result;
};

/* Outputs the result into the display */
const createResultString = (value) => {
    if (value === null) {
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
        action === 'plusminus'
    ) {

        let calcValue = displayedNum;
        switch( Math.sign(displayedNum) ) {
        case 1:
            calcValue = -Math.abs(displayedNum);
            break;
        case -1:
            calcValue = Math.abs(displayedNum);
            break;
        }

        calculator.data('firstValue', calcValue);
        createResultString(calcValue);
        calculator.data('previousKeyType', 'operator');
        calculator.data('operator', action);
    }

    if (
        action === 'pow' ||
        action === 'pow3' ||
        action === 'sqrt' ||
        action === 'cbrt' ||
        action === 'percent'
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

    if (debug) {
        console.log(`
            action = ${action}
            keyContent = ${keyContent}
            displayedNum = ${displayedNum}
            previousKeyType = ${previousKeyType}
        `);
    }
});

/* Listen for Keyboard events */
$(document).on('keyup', e => {
    const pressedKey = $(`button[data-key='${getPressedKey(e.keyCode, e.shiftKey)}']`);
    if (!pressedKey) return;
    pressedKey.click();
});

const getPressedKey = function (keyCode, shiftKey) {
    const isShift = shiftKey ? true : false;

    if (keyCode == 48 || keyCode == 96) { return 96; } // 0
    if (keyCode == 49 || keyCode == 97) { return 97; } // 1
    if (keyCode == 50 || keyCode == 98) { return 98; } // 2
    if (keyCode == 51 || keyCode == 99) { return 99; } // 3
    if (keyCode == 52 || keyCode == 100) { return 100; } // 4
    if (keyCode == 53 || keyCode == 101) { return 101; } // 5
    if (keyCode == 54 || keyCode == 102) { return 102; } // 6
    if ((isShift && keyCode == 55) || keyCode == 191 || keyCode == 111) { return 111; } // / devide
    if (keyCode == 55 || keyCode == 103) { return 103; } // 7
    if ((!isShift && keyCode == 56) || keyCode == 104) { return 104; } // 8
    if (keyCode == 57 || keyCode == 105) { return 105; } // 9
    if ((isShift && keyCode == 56 || keyCode == 221) || keyCode == 106) { return 106; } // * multiply
    if (keyCode == 187 || keyCode == 107) { return 107; } // + add
    if (keyCode == 189 || keyCode == 109) { return 109; } // - subtract
    if (keyCode == 190 || keyCode == 110) { return 110; } // .
    if (keyCode == 46 || keyCode == 8 || keyCode == 12) { return 8; } // delete key clear
    if ((isShift && keyCode == 48) || keyCode == 13) { return 13; } // return key  =

    return false;
};

$(function() {
    $('.styleSwitch').on('click', function(e) {
        $('body').attr('class', '').addClass($(this).attr('data-style'));
    });
});
