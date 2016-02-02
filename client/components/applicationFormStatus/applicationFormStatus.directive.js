'use strict';

angular.module('investnextdoorCaApp')
  .directive('applicationFormStatus', function () {
    return {
      templateUrl: 'components/applicationFormStatus/applicationFormStatus.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
