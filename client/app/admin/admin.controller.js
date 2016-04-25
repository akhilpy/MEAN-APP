'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth, $filter) {
    var vm = this;
    vm.$state = $state;
    vm.$filter = $filter;
    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;
    vm.Auth = Auth;

    vm.listings = vm.$filter('orderBy')(listings.data, 'date', true);
    vm.allListings = vm.listings;
    vm.users = users.data;
    vm.offers = offers.data;

    vm.$scope.sortType = '-joined';
    vm.$scope.sortReverse = false;
    vm.$scope.searchListings = '';

    if(vm.$stateParams.status) {
      vm.$scope.breadcrumb = vm.$stateParams.status;
    } else if(vm.$stateParams.role) {
      vm.$scope.breadcrumb = vm.$stateParams.role;
    }

    vm.adminEditing = true;
    vm.searchTerm = '';

    $scope.$watch('vm.searchTerm', function(val) {
      vm.allListings = vm.$filter('filter')(vm.listings, val);
    });
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

  deleteListing(listing) {
    this.ListingService.deleteOne(listing._id);
    this.allListings.splice(this.allListings.indexOf(listing), 1);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminController', AdminController);

})();
