webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//Creating the Application Module

		'use strict';
		__webpack_require__(1);	
		var curConvApp = angular.module('currencyConverterApp',[]);
		
		__webpack_require__(3);
		__webpack_require__(4);
		__webpack_require__(5);
		//require('./main');



/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	// decimalNumber is a directive that restricts the value to number and two decimal places
		'use strict';

	curConvApp.directive('decimalNumber', function() {
	      return {
	        require: '?ngModel',
	        link: function(scope, element, attrs, ngModelCtrl) {
	          if(!ngModelCtrl) {
	            return; 
	          }

	          ngModelCtrl.$parsers.push(function(val) {
	            if (angular.isUndefined(val)) {
	                var val = '';
	            }
	            // restrict value entered in input to number and dot
	            var modifiedVal = val.replace(/[^0-9\.]/g, '');
	      		var decimalCheck = modifiedVal.split('.');          
	            
	      		//restrict from entering more than two values after decimal point
	            if(!angular.isUndefined(decimalCheck[1])) {
	                decimalCheck[1] = decimalCheck[1].slice(0,2);
	                modifiedVal = decimalCheck[0] + '.' + decimalCheck[1];
	            }

	            if (val !== modifiedVal) {
	              ngModelCtrl.$setViewValue(modifiedVal);
	              ngModelCtrl.$render();
	            }
	            return modifiedVal;
	          });

	          element.bind('keypress', function(event) {
	        	 //restrict from entering a space
	            if(event.keyCode === 32) {
	              event.preventDefault();
	            }
	            //restrict from entering a dot when it already exist
	            var oldValue = this.value;
	            if(oldValue.indexOf('.') >= 0 && event.charCode == 46){
	                 event.preventDefault();
	            }
	          });
	        }
	      };
	    });



/***/ },
/* 4 */
/***/ function(module, exports) {

	//select directive triggers change event on keyup
		'use strict';

	curConvApp.directive("select", function() {
	    return {
	      restrict: "E",
	      require: "?ngModel",
	      scope: false,
	      link: function (scope, element, attrs, ngModel) {
	        if (!ngModel) {
	          return;
	        }
	        element.bind("keyup", function() {
	          element.triggerHandler("change");
	        })
	      }
	    }
	  });


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//curConvController includes the logic for the currency Converter form 

		'use strict';
		__webpack_require__(6);
	curConvApp.controller("curConvController",['$scope','$rootScope','dataServices',function($scope,$rootScope,dataServices){
		$scope.convAmt = "0.00";
		$scope.initAmt = "";
		$scope.currencyRatesList;
		$scope.initCurr = "CAD";
		$scope.convCurr = "USD";
		$scope.showErrorMsg = false;
		$scope.errorMsg="";
		$scope.disclaimerInfo = false;
		$scope.equivAmt;
		$scope.discAmt= 1;
		$scope.eqConstant = "=";
		//Function called on change event of enter value/ selecting a currency type
		$scope.convertAmt = function(){
			var amt = $scope.initAmt;
			if($scope.initCurr === $scope.convCurr){
				if(typeof(amt) === undefined || amt===null  ||  amt==="" || amt==="0.00" || amt==="0" || amt==="0.0"){
					$scope.convAmt = "0.00";
				}
				else{
					$scope.convAmt = amt;
				}
				$scope.equivAmt =  1;
				return;
			}
				angular.forEach($scope.currencyRatesList, function(value, key) {
					if(key === $scope.convCurr){
						$scope.equivAmt =  value;
						if(typeof(amt) != undefined && amt!=null  && amt!=="0.00" && amt!=="0" && amt!=="0.0"){
							$scope.convAmt = (parseFloat(amt) * parseFloat(value)).toFixed(2);
						}
					}
				});		
			
			if(typeof(amt) === undefined || amt===null  ||  amt==="" || amt==="0.00" || amt==="0" || amt==="0.0"){
				$scope.convAmt = "0.00";
			}
		};
		//Function called on change event of selecting a currency type to get currency rates
		$scope.getCurrencyRates = function(){
			var symbols
			if($scope.initCurr === "CAD"){
				symbols = "EUR,USD"
			}else if($scope.initCurr === "USD"){
				symbols = "EUR,CAD"
			}else if($scope.initCurr === "EUR"){
				symbols = "CAD,USD"
			}			
			dataServices.getCurrencyRates($scope.initCurr,symbols,$scope.successCurrencyRatesFunc,$scope.errorFunc);
		};
		//Function called to set error message if any error occurs
		 $scope.errorFunc = function(result,status){
			 if(status == 400){
				 $scope.errorMsg = result.header.message;
		   	  }
		   	  else{
		   		 $scope.errorMsg = "Application encountered a problem. Fixer Rate API is down";
		   	  }
			 $scope.showErrorMsg = true;
		 };
		 //Function called on success of getCurrencyRates
		$scope.successCurrencyRatesFunc = function(result){
			if(typeof(result) != undefined && result!=null && result.hasOwnProperty("rates")){
				$scope.currencyRatesList = result.rates;
				$scope.convertAmt();
			}
			else{
				$scope.errorFunc("","500");
			}
		};
		$scope.showDisclaimerInfo = function(){
			$scope.disclaimerInfo = !$scope.disclaimerInfo;
		}
		//Funciton is called on pageload
		$scope.getCurrencyRates();
	}]);



/***/ },
/* 6 */
/***/ function(module, exports) {

	//DataServices Factory includes the http service calls
		'use strict';

	curConvApp.factory('dataServices', ['$http',
	    function ($http) {
	        var dataServicesInstance = {};
	       
	        dataServicesInstance.ConvertCurrency_Url ="http://api.fixer.io/latest";
	        
	        
	        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	
	        //method called to return currency rates
	        dataServicesInstance.getCurrencyRates = function (base,symbols,success,error) {
				var url = dataServicesInstance.ConvertCurrency_Url +"?base="+base+"&symbols="+symbols;
	            dataServicesInstance.Get(url, success,error);
	        };
	        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	        
	        

	        //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-	        
	        //Call GET service to load data
	        dataServicesInstance.Get = function (_url, success,error) {
	            $http({
	                method: 'GET',
	                url: _url,
	                cache: false
	            })
	                .success(function (data, status, headers, config) {
	                    if (status === 200) {
	                        success(data);
	                    }
	                    else {
	                       error(data,status);
	                    }
	                    return false;
	                })
	                .error(function (data, status, headers, config) {
	                    error(data,status);
	                    return false;
	                });
	        };
	      
	        return dataServicesInstance;
	    }
	]);


/***/ }
]);