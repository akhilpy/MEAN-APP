'use strict';

angular.module('investnextdoorCaApp')
  .directive('dateObject', function () {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // view --> model (change date to string)
        ngModel.$parsers.push(function(viewValue){
          return viewValue.toISOString();
        });

        // model --> view (change string to date)
        ngModel.$formatters.push(function(modelValue){
          return new Date(modelValue);
        });
      }
    };
  });
