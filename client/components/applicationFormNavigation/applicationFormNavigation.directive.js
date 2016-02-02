'use strict';

angular.module('investnextdoorCaApp')
  .directive('applicationFormNavigation', function () {
    return {
      templateUrl: 'components/applicationFormNavigation/applicationFormNavigation.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
