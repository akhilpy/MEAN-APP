'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;
    vm.Auth = Auth;

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
    this.Auth.delete(user._id);
    this.users.splice(this.users.indexOf(user), 1);
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
