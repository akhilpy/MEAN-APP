'use strict';

(function() {

class MarketplaceController {
  constructor(listings, ListingService, $scope) {
    var vm = this;
    vm.$scope = $scope;
    vm.allListings = listings.data;

    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';

    vm.filters = {
      distances: ListingService.getDistance(),
      rates: ListingService.getRates(),
      minimums: ListingService.getMinimum(),
      terms: ListingService.getTerms(),
      purposes: ListingService.getPurposes(),
      times: ListingService.getTimes()
    };

    vm.offers = {
      sortType: 'general.businessName',
      sortReverse: false,
      searchOffers: ''
    }

    vm.$scope.filterTerm = function(val) {
      return function(item) {
        return item.details.term > val;
      }
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
