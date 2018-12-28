(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/*
Define the calculator parts (calulator, display and keys)
*/

var calculator = document.getElementById('calculator');
var display = document.querySelector('.display');
var keys = calculator.querySelector('.keys');
/* Add the click event listener for all keys ie buttons*/

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    var key = e.target;
    var action = key.dataset.action; // if exists get the data-action attribute from the button

    if (!action) {
      console.log('number key!');
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
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