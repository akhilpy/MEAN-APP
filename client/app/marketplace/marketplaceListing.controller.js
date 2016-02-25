'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing) {
    var vm = this;
    vm.currentListing = listing.data
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

})();
