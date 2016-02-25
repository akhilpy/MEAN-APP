'use strict';

(function() {

class MarketplaceController {
  constructor(listings) {
    var vm = this;
    vm.allListings = listings.data;

    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';

    vm.offers = {
      sortType: 'general.businessName',
      sortReverse: false,
      searchOffers: ''
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
