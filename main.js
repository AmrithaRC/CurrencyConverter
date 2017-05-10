require.config({
	baseUrl:'/app',
	paths: {
		angular:'assets/js/angular'
	},
	shim: {
		"angular": {
			exports:"angular"
		}
	}
});
require(['app','factory/dataServices','directive/decimalNumber','directive/selectEvent','controller/curConvController'],function(){
	angular.bootstrap(document,['currencyConverterApp']);
});