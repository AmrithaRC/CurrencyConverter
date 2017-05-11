require.config({
	baseUrl:'app',
	paths: {
		angular:'../assets/js/angular',
		app:'app',
		factory:'factory/dataServices',		
		decimalNumber:'directive/decimalNumber',
		selectEvent:'directive/selectEvent',
		curConvController:'controller/curConvController'
		
	},
	shim: {
		"angular": {
			exports:"angular"
		}
	}
});
require(['angular','app','factory','decimalNumber','selectEvent','curConvController'],function(angular){
	angular.bootstrap(document,['currencyConverterApp']);
});