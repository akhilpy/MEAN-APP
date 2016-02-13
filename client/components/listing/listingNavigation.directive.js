'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingNavigation', function () {
    return {
      templateUrl: 'components/listing/listingNavigation.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });
