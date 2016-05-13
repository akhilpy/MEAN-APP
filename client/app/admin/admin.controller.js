'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth, $filter, socket, $rootScope, moment, $q, Offers, Emails, Report) {
    var vm = this;
    vm.$state = $state;
    vm.$q = $q;
    vm.$filter = $filter;
    vm.$scope = $scope;
    vm.socket = socket;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;
    vm.Offers = Offers;
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

    $rootScope.$on('updateUsers', function() {
      vm.socket.syncUpdates('user', vm.users);
    });

    $scope.$on('$destroy', function() {
      vm.socket.unsyncUpdates('user');
    });

    $scope.$watch('vm.searchListings', function(val) {
      vm.allListings = vm.$filter('filter')(vm.listings, val);
    });

    $scope.$watch('vm.searchUsers', function(val) {
      vm.allListings = vm.$filter('filter')(vm.users, val);
    });

    vm.$scope.exportListings = [];
    vm.$scope.canExportListings = false;
    Report.listings()
    .then(listings => {
      if(listings.length > 0) {
        vm.$scope.exportListings = listings;
        vm.$scope.canExportListings = true;
      }
    });

    vm.$scope.exportUsers = [];
    vm.$scope.canExportUsers = false;
    Report.users()
    .then(users => {
      if(users.length > 0) {
        vm.$scope.exportUsers = users;
        vm.$scope.canExportUsers = true;
      }
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
