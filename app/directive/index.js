'use strict';
var angular = require('angular');
angular.module('currencyConverterApp').
directive('decimalNumber', require('./decimalNumber'));
angular.module('currencyConverterApp').
directive('select', require('./selectEvent'));