'use strict';

class MarketplaceListingController {
  constructor($http, $scope, socket, $stateParams, Listing) {
    var vm = this;
    vm.listingID = $stateParams.id;
    vm.currentListing = {};

    $http.get('/api/listings/' + vm.listingID).success(function(listing) {
      vm.currentListing = listing;
      socket.syncUpdates('listing', vm.currentListing);
    });
  }

  makeOffer() {
    console.log('make offer');
  }

  bookmark() {
    console.log('bookmark');
  }

  requestDetails() {
    console.log('request details');
  }

}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceListingController', MarketplaceListingController);
