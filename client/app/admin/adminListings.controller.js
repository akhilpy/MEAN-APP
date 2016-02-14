'use strict';

(function() {

class AdminListingsController {
  constructor($http, $scope, socket, $state, User) {
    var vm = this;
    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';
    vm.allListings = [];

    vm.listingsUrl = '/api/listings';
    vm.$state = $state;
    vm.status = vm.$state.params.status;
    if( vm.status ) {
      vm.listingsUrl = '/api/listings/status/' + vm.status;
    }


    $http.get(vm.listingsUrl).success(function(allListings) {
      vm.allListings = allListings;
      socket.syncUpdates('listing', vm.allListings);
    });
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminListingsController', AdminListingsController);

})();
