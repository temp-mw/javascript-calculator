'use strict';

/*
Define the calculator parts (calulator, display and keys)
*/
const calculator = document.getElementById('calculator');
const display = document.querySelector('.display');
const keys = calculator.querySelector('.keys');

/* Add the click event listener for all keys ie buttons*/
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action; // if exists get the data-action attribute from the button

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
