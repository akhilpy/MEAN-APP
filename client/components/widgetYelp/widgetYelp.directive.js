'use strict';

angular.module('investnextdoorCaApp')
  .directive('widgetYelp', function () {
    return {
      templateUrl: 'components/widgetYelp/widgetYelp.html',
      restrict: 'EA',
      controller: 'widgetYelpController',
      controllerAs: 'yelp'
    };
  });
