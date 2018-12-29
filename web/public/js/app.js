(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); // add jquery

/*
Define all calculator parts for reference
*/

var calculator = $('#calculator');
var display = $('#calculator .display');
var keys = $('#calculator .keys');
var clearButton = keys.find('button[data-action=clear]');
/*
Passes all calculations to the nodejs api via ajax post and processes the result
*/

var calculate = function calculate(n1, operator, n2) {
  var request = {
    n1: n1,
    n2: n2,
    operator: operator
  };
  $.ajax({
    type: 'POST',
    xhrFields: {
      withCredentials: true
    },
    url: 'http://localhost:3001',
    dataType: 'json',
    data: request,
    success: function success(data) {
      display.text(data);
    }
  });
};
/* Add the click event listener for all keys */


keys.on('click', function (e) {
  if (e.target.matches('button')) {
    var key = $(e.target); // make target a jQuery instance

    var action = key.attr('data-action'); // if exists get the data-action attribute from the button

    var keyContent = key.text(); // value of the pressed key

    var displayedNum = display.text(); // value of the display

    var previousKeyType = calculator.data('previousKeyType'); // memorize the previous key type
    // Remove .is-pressed class from all keys

    keys.find('button').removeClass('is-pressed');

    if (!action) {
      // number keys
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.text(keyContent);
      } else {
        display.text(displayedNum + keyContent);
      }

      calculator.data('previousKeyType', 'number');
    }

    if ( // operators
    action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      var firstValue = calculator.data('firstValue');
      var operator = calculator.data('operator');
      var secondValue = displayedNum; // Note: It's sufficient to check for firstValue and operator because secondValue always exists

      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        var calcValue = calculate(firstValue, operator, secondValue);
        display.text(calcValue); // Update firstValue to calculated value

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
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
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
      var _firstValue = calculator.data('firstValue');

      var _operator = calculator.data('operator');

      var _secondValue = displayedNum;

      if (_firstValue) {
        if (previousKeyType === 'calculate') {
          _firstValue = displayedNum;
          _secondValue = calculator.data('modValue');
        } // display.text(calculate(firstValue, operator, secondValue));


        calculate(_firstValue, _operator, _secondValue);
      } // Set modValue attribute


      calculator.data('modValue', _secondValue);
      calculator.data('previousKeyType', 'calculate');
    }

    if (action !== 'clear') {
      clearButton.text('CE');
    }
  }
});

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/app.js ./src/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/Guni/Code/fh/web/calculator/web/src/app.js */"./src/app.js");
module.exports = __webpack_require__(/*! /Users/Guni/Code/fh/web/calculator/web/src/app.scss */"./src/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);