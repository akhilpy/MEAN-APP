'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetFinder', function () {
    return {
      templateUrl: 'components/widgetFinder/widgetFinder.html',
      restrict: 'EA',
      controller: 'WidgetFinderController',
      controllerAs: 'widget'
    };
  });
