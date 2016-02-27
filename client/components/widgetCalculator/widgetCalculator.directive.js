'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetCalculator', function () {
    return {
      templateUrl: 'components/widgetCalculator/widgetCalculator.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
