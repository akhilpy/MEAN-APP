'use strict';

angular.module('investnextdoorCaApp')
  .directive('listingStatus', function (Listing) {
    return {
      templateUrl: 'components/listing/listingStatus.html',
      restrict: 'EA',
      link: function (scope) {

        scope.status = {
          general: Listing.getPageStatus('general'),
          details: Listing.getPageStatus('details'),
          financial: Listing.getPageStatus('financial'),
          social: Listing.getPageStatus('social'),
          terms: Listing.getPageStatus('terms'),
        };

      }
    };
  });
