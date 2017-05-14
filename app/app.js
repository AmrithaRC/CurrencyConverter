//Creating the Application Module

	'use strict';
	require('angular');	
	var curConvApp = angular.module('currencyConverterApp',[]);
	
	require('./directive');
	require('./factory');
	require('./controller');
	require('./main');

