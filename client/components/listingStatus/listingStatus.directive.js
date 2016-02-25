'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingStatus', function (ListingService) {
    return {
      templateUrl: 'components/listingStatus/listingStatus.html',
      restrict: 'EA',
      controller: 'ListingStatusController',
      controllerAs: 'status'
    };
  });
