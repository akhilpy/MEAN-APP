'use strict';

angular.module('investnextdoorCaApp')
  .directive('meter', function () {
    return {
      templateUrl: 'components/meter/meter.html',
      restrict: 'EA',
      scope: {
        meter: '='
      },
      controller: 'MeterController',
      controllerAs: 'meter'
    };
  });
