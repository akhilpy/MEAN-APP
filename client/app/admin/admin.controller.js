'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth, $filter, socket, $rootScope, moment, $q, Offers, Emails, Report, Payments) {
    var vm = this;
    vm.$state = $state;
    vm.$q = $q;
    vm.$filter = $filter;
    vm.$scope = $scope;
    vm.socket = socket;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;
    vm.Offers = Offers;
    vm.Payments = Payments;
    vm.Auth = Auth;

    vm.$scope.logs = [];

    if(vm.$stateParams.status) {
      vm.$scope.breadcrumb = vm.$stateParams.status;
    } else if(vm.$stateParams.role) {
      vm.$scope.breadcrumb = vm.$stateParams.role;
    } else if(vm.$stateParams.method) {
      vm.$scope.breadcrumb = vm.$stateParams.method;
    } else {
      vm.$scope.breadcrumb = false;
    }

    Payments.getLogs('success', vm.$scope.breadcrumb)
    .then(response => {
      vm.$scope.logs = response.data;
      console.log(response.data);
    });

    vm.listings = vm.$filter('orderBy')(listings.data, 'date', true);
    vm.allListings = vm.listings;
    vm.allUsers = vm.users;
    vm.users = users.data;
    vm.offers = offers.data;

    vm.$scope.sortType = '-joined';
    vm.$scope.logSort = '-datetime';
    vm.$scope.sortReverse = false;
    vm.searchListings = '';
    vm.searchUsers = '';

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
      vm.allUsers = vm.$filter('filter')(vm.users, val);
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
