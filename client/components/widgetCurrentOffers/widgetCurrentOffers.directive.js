'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetCurrentOffers', function () {
    return {
      templateUrl: 'components/widgetCurrentOffers/widgetCurrentOffers.html',
      restrict: 'EA',
      controller: 'WidgetCurrentOffersController',
      controllerAs: 'widget'
    };
  });
