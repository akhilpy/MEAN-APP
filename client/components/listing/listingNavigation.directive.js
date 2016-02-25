'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingNavigation', ['ListingService', function(ListingService) {
    return {
      templateUrl: 'components/listing/listingNavigation.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        
      }
    };
  }]);
