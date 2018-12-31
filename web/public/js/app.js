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
var keys = $('button');
var clearButton = $('button[data-action=clear]');
var history = $('#history');
/*
Passes all calculations to the nodejs api
via ajax post and creates a promise
*/

var calculate = function calculate(n1, operator, n2) {
  var request = {
    n1: n1,
    n2: n2,
    operator: operator
  };
  var result = $.ajax({
    type: 'POST',
    xhrFields: {
      withCredentials: true
    },
    url: 'http://localhost:3001',
    async: false,
    dataType: 'json',
    data: request,
    success: function success(data) {
      history.prepend("<li>".concat(data.calc, " = ").concat(data.result, "</li>"));
    }
  });
  return result;
};
/* Outputs the result into the display */


var createResultString = function createResultString(value) {
  if (value === null) {
    display.text('NaN');
    return;
  }

  display.text(value);
};
/* Add the click event listener for all buttons */


keys.on('click', function (e) {
  var key = $(e.target); // make target a jQuery instance

  var action = key.attr('data-action'); // if exists get the data-action attribute from the button

  var keyContent = key.text(); // value of the pressed key

  var displayedNum = display.text(); // value of the display

  var previousKeyType = calculator.data('previousKeyType'); // memorize the previous key type
  // Remove .is-pressed class from all keys

  keys.removeClass('is-pressed');

  if (!action) {
    // number keys
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
      createResultString(keyContent);
    } else {
      createResultString(displayedNum + keyContent);
    }

    calculator.data('previousKeyType', 'number');
  }

  if ( // operators
  action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'powy' || action === 'nthrt') {
    var firstValue = calculator.data('firstValue');
    var operator = calculator.data('operator');
    var secondValue = displayedNum; // Note: It's sufficient to check for firstValue and operator because secondValue always exists

    if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
      calculate(firstValue, operator, secondValue).then(function (data) {
        var calcValue = data.result;
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

  if (action === 'pow' || action === 'pow3' || action === 'sqrt' || action === 'cbrt') {
    calculate(displayedNum, action).then(function (data) {
      var calcValue = data.result;
      createResultString(calcValue);
      calculator.data('firstValue', calcValue);
    });
    calculator.data('previousKeyType', 'operator');
    calculator.data('operator', action);
  }

  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
      createResultString(displayedNum + '.');
    } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
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
    var _firstValue = calculator.data('firstValue');

    var _operator = calculator.data('operator');

    var _secondValue = displayedNum;

    if (_firstValue) {
      if (previousKeyType === 'calculate') {
        _firstValue = displayedNum;
        _secondValue = calculator.data('modValue');
      }

      calculate(_firstValue, _operator, _secondValue).then(function (data) {
        createResultString(data.result); // v1 is undefined
      });
    } // Set modValue attribute


    calculator.data('modValue', _secondValue);
    calculator.data('previousKeyType', 'calculate');
  }

  if (action !== 'clear') {
    clearButton.text('CE');
  }
});
/* Listen for Keyboard events */

$(document).on('keyup', function (e) {
  var pressedKey = $("button[data-key='".concat(getPressedKey(e.keyCode, e.shiftKey), "']"));
  if (!pressedKey) return;
  pressedKey.click();
});

var getPressedKey = function getPressedKey(keyCode, shiftKey) {
  var isShift = shiftKey ? true : false;

  if (keyCode == 48 || keyCode == 96) {
    return 96;
  } // 0


  if (keyCode == 49 || keyCode == 97) {
    return 97;
  } // 1


  if (keyCode == 50 || keyCode == 98) {
    return 98;
  } // 2


  if (keyCode == 51 || keyCode == 99) {
    return 99;
  } // 3


  if (keyCode == 52 || keyCode == 100) {
    return 100;
  } // 4


  if (keyCode == 53 || keyCode == 101) {
    return 101;
  } // 5


  if (keyCode == 54 || keyCode == 102) {
    return 102;
  } // 6


  if (isShift && keyCode == 55 || keyCode == 191 || keyCode == 111) {
    return 111;
  } // / devide


  if (keyCode == 55 || keyCode == 103) {
    return 103;
  } // 7


  if (!isShift && keyCode == 56 || keyCode == 104) {
    return 104;
  } // 8


  if (keyCode == 57 || keyCode == 105) {
    return 105;
  } // 9


  if (isShift && keyCode == 56 || keyCode == 221 || keyCode == 106) {
    return 106;
  } // * multiply


  if (keyCode == 187 || keyCode == 107) {
    return 107;
  } // + add


  if (keyCode == 189 || keyCode == 109) {
    return 109;
  } // - subtract


  if (keyCode == 190 || keyCode == 110) {
    return 110;
  } // .


  if (keyCode == 46 || keyCode == 8 || keyCode == 12) {
    return 8;
  } // delete key clear


  if (isShift && keyCode == 48 || keyCode == 13) {
    return 13;
  } // return key  =


  return false;
};

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