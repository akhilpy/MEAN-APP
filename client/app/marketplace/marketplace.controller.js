'use strict';

(function() {

class MarketplaceController {
  constructor(listings, ListingService, $scope) {
    var vm = this;
    vm.$scope = $scope;
    vm.allListings = listings.data;

    vm.$scope.sortType = 'general.businessName';
    vm.$scope.sortReverse = false;
    vm.$scope.searchListings = '';

    vm.filters = {
      distances: ListingService.getDistance(),
      rates: ListingService.getFilterRates(),
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
        return item.details.term >= val;
      }
    }

    vm.$scope.filterRate = function(val) {
      return function(item) {
        return item.admin.basics.listedRate >= val;
      }
    }

  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
