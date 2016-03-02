'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingNavigationAdmin', ['ListingService', function(ListingService) {
    return {
      templateUrl: 'components/listing/listingNavigation.admin.html',
      restrict: 'EA',
      controller: 'ListingNavigationController',
      controllerAs: 'tabs'
    };
  }]);
