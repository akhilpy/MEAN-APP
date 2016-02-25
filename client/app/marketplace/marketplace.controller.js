'use strict';

(function() {

class MarketplaceController {
  constructor(listings) {
    var vm = this;
    vm.allListings = listings.data;

    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
