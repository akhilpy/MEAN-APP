'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetBenefits', function () {
    return {
      templateUrl: 'components/widgetBenefits/widgetBenefits.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
