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

