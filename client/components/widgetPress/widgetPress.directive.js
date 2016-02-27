'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetPress', function () {
    return {
      templateUrl: 'components/widgetPress/widgetPress.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
