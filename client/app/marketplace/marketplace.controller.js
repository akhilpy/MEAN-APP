'use strict';

(function() {

class MarketplaceController {
  constructor($http, $scope, socket) {
    var vm = this;

    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';

    vm.allListings = [];

    $http.get('/api/listings/status/approved').success(function(allListings) {
      vm.allListings = allListings;
      socket.syncUpdates('listing', vm.allListings);
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', MarketplaceController);

})();
