'use strict';

angular.module('investnextdoorCaApp')
  .directive('breadcrumbs', function () {
    return {
      templateUrl: 'components/breadcrumbs/breadcrumbs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
