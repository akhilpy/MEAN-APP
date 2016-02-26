'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetOffer', function () {
    return {
      templateUrl: 'components/widgetOffer/widgetOffer.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
