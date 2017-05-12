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
