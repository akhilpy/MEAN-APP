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
      distance: 0,
      time: 60
    }

    ListingService.getCurrentUser()
    .then(user => {
      vm.currentUser = user;
      if(user.filters.marketplace) {
        if(user.filters.marketplace.rate) {
          vm.$scope.defaultFilter.rate = user.filters.marketplace.rate;
        }
        if(user.filters.marketplace.term) {
          vm.$scope.defaultFilter.term = user.filters.marketplace.term;
        }
        if(user.filters.marketplace.minimum) {
          vm.$scope.defaultFilter.minimum = user.filters.marketplace.minimum;
        }
        if(user.filters.marketplace.distance) {
          vm.$scope.defaultFilter.distance = user.filters.marketplace.distance;
        }
        if(user.filters.marketplace.time) {
          vm.$scope.defaultFilter.time = user.filters.marketplace.time;
        }
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

    vm.$scope.filterTime = function(val) {
      return function(item) {
        if(item.admin.basics.deadlineDays.type === 'days') {
          return item.admin.basics.deadlineDays.value <= val;
        } else if(val < 1) {
          return item.admin.basics.deadlineDays.value != val;
        }
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
      distance: 0,
      time: 60
    };
    this.$rootScope.$broadcast('resetChosen');
  }

  outputDeadline(listing) {
    var now = moment();
    var deadline = moment(listing.admin.basics.deadline);
    return deadline.diff(now, 'days');
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
