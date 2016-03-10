'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetOffer', function () {
    return {
      templateUrl: 'components/widgetOffer/widgetOffer.html',
      restrict: 'EA',
      controller: 'WidgetOfferController',
      controllerAs: 'offerWidget'
    };
  });
