'use strict';

window.$ = window.jQuery = require('jquery');

/*
Define the calculator parts (calulator, display and keys)
*/
const calculator = $('#calculator');
const display = $('#calculator .display');
const keys = $('#calculator .keys');

/* Add the click event listener for all keys ie buttons*/
// keys.addEventListener('click', e => {
keys.on('click', e => {
    if (e.target.matches('button')) {
        const key = $(e.target); // make target a jQuery object
        const action = key.attr('data-action'); // if exists get the data-action attribute from the button

        if (!action) {
            console.log('number key!');
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!');
        }

        if (action === 'decimal') {
            console.log('decimal key!');
        }

        if (action === 'clear') {
            console.log('clear!');
        }

        if (action === 'calculate') {
            console.log('equal key!');
        }

    }
});
