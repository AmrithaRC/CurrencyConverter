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
            
            var modifiedVal = val.replace(/[^0-9\.]/g, '');
      			var decimalCheck = modifiedVal.split('.');          
              
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
            if(event.keyCode === 32) {
              event.preventDefault();
            }
            var oldValue = this.value;
            if(oldValue.indexOf('.') >= 0 && event.charCode == 46){
                 event.preventDefault();
            }
          });
        }
      };
    });