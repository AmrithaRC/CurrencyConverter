//curConvController includes the logic for the currency Converter form 
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
			$scope.convAmt = amt;
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