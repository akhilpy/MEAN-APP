'use strict';

(function() {

class MarketplaceController {
  constructor(listings, ListingService, $scope, $q, $rootScope, moment, Offers) {
    var vm = this;
    vm.$scope = $scope;
    vm.$q = $q;
    vm.Offers = Offers;
    vm.moment = moment;
    vm.$rootScope = $rootScope;
    vm.ListingService = ListingService;
    vm.allListings = [];

    angular.forEach(listings.data, function(listing, key) {
      if(listing.details.listingType === 'Marketplace') {
        vm.allListings.push(listing);
      }
    });

    vm.$scope.sortType = '-date';
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

    vm.$scope.savedFilters = false;
    this.$scope.defaultFilter = {
      rate: 0,
      term: 0,
      minimum: 0,
      distance: 0
    }

    ListingService.getCurrentUser()
    .then(user => {
      vm.currentUser = user;
      if(user.filters.marketplace) {
        vm.$scope.defaultFilter = user.filters.marketplace;
      }
    })
    .then(() => {
      vm.$rootScope.$broadcast('updateChosen');
    });

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

    vm.$scope.filterMinimum = function(val) {
      return function(item) {
        return item.admin.basics.investment.min >= val;
      }
    }
  }

  filterSave(filters) {
    var vm = this;
    vm.ListingService.saveMarketplaceFilters(filters)
    .then(() => {
      vm.$scope.savedFilters = true;
    })
    .catch(err => {
      vm.$scope.savedFilters = false;
    });
  }

  filterClear() {
    this.$scope.defaultFilter = {
      rate: 0,
      term: 0,
      minimum: 0,
      distance: 0
    };
    this.$rootScope.$broadcast('resetChosen');
  }

  outputDeadline(listing) {
    return moment(listing.admin.basics.deadline).toNow(true);
  }

  hasOffers(listing) {
    var vm = this;
    var promises = [];

    return vm.Offers.getListingOffers(listing._id)
    .then(offers => {
      var breakLoop = false;
      var hasOffers = false;
      angular.forEach(offers.live, function(offer, key) {
        if(offer.user._id === vm.currentUser._id && !breakLoop) {
          breakLoop = true;
          hasOffers = true;
        }
        promises.push(offer);
      });

      return vm.$q.all(promises).then(function() {
        return hasOffers;
      });
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
