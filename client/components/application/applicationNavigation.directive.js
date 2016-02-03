'use strict';

angular.module('investnextdoorCaApp')
  .directive('applicationNavigation', function () {
    return {
      templateUrl: 'components/application/applicationNavigation.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
