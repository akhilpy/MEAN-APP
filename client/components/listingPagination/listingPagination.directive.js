'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingPagination', function () {
    return {
      templateUrl: 'components/listingPagination/listingPagination.html',
      restrict: 'EA',
      controller: 'ListingPaginationController',
      controllerAs: 'nav'
    };
  });
