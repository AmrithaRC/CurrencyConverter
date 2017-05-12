//Creating the Application Module

	'use strict';
	require('angular');	
	var curConvApp = angular.module('currencyConverterApp',[]);
	
	require('./directive/decimalNumber');
	require('./directive/selectEvent');
	require('./controller/curConvController');
	//require('./main');

