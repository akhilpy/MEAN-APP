'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;

    vm.allListings = listings.data;
    vm.users = users.data;
    vm.offers = offers.data;

    vm.$scope.sortType = 'name.last';
    vm.$scope.sortReverse = false;
    vm.$scope.searchListings = '';

    if(vm.$stateParams.status) {
      vm.$scope.breadcrumb = vm.$stateParams.status;
    } else if(vm.$stateParams.role) {
      vm.$scope.breadcrumb = vm.$stateParams.role;
    }

    vm.adminEditing = true;

  }

  delete(user) {
    var vm = this;
    user.$remove();
    vm.users.splice(vm.users.indexOf(user), 1);
  }

  edit(user) {
    var vm = this;
    alert('Editing: ' + user.name.first + ' ' + user.name.last);
  }

  approve(listingID) {
    var vm = this;
    vm.ListingService.approveOne(listingID);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminController', AdminController);

})();
