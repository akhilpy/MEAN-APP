'use strict';

(function() {

class ListingStatusController {

  constructor($scope, ListingService) {
    var vm = this;
    vm.Listing = ListingService;
    vm.$scope = $scope;

    vm.$scope.status = {
      general: vm.Listing.getPageStatus('general'),
      details: vm.Listing.getPageStatus('details'),
      financial: vm.Listing.getPageStatus('financial'),
      social: vm.Listing.getPageStatus('social'),
      terms: vm.Listing.getPageStatus('terms'),
    };
  }

}

angular.module('investnextdoorCaApp')
  .controller('ListingStatusController', ListingStatusController);

})();
