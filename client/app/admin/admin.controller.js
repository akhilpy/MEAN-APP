'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth, $filter, socket, $rootScope, moment, $q, Offers, Emails, Report, Payments, Transactions) {
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
    vm.Transactions = Transactions;
    vm.Auth = Auth;

    vm.$scope.transactions = [];
    vm.$scope.transactionSort = '-date';
    var filter;

    if(vm.$stateParams.status) {
      vm.$scope.breadcrumb = vm.$stateParams.status;
    } else if(vm.$stateParams.role) {
      vm.$scope.breadcrumb = vm.$stateParams.role;
    } else if(vm.$stateParams.entry) {
      vm.$scope.breadcrumb = vm.$stateParams.entry;
      filter = vm.$stateParams.entry;
    } else {
      vm.$scope.breadcrumb = false;
      filter = false;
    }


    var promises = [];
    var filteredTransactions = [];

    Transactions.get(filter)
    .then(transactions => {
      angular.forEach(transactions, function(transaction, key) {
        if(transaction.entry === 'Debit') {
          transaction.debit = transaction.amount;
          transaction.credit = null;
        } else if (transaction.entry === 'Credit') {
          transaction.credit = transaction.amount;
          transaction.debit = null;
        }
        filteredTransactions.push(transaction);
        promises.push(transaction);
      });
      vm.$q.all(promises).then(function() {
        vm.$scope.transactions = filteredTransactions;
        vm.allTransactions = vm.$scope.transactions;
      });
    });

    vm.listings = vm.$filter('orderBy')(listings.data, 'date', true);
    vm.allListings = vm.listings;
    vm.allUsers = vm.users;

    vm.users = users.data;
    vm.offers = offers.data;

    vm.$scope.sortType = '-joined';
    vm.$scope.sortReverse = false;
    vm.searchListings = '';
    vm.searchUsers = '';
    vm.searchTransactions = '';

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

    $scope.$watch('vm.searchTransactions', function(val) {
      vm.allTransactions = vm.$filter('filter')(vm.$scope.transactions, val);
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

    vm.$scope.exportTransactions = [];
    vm.$scope.canExportTransactions = false;
    Report.transactions()
    .then(transactions => {
      if(transactions.length > 0) {
        vm.$scope.exportTransactions = transactions;
        vm.$scope.canExportTransactions = true;
      }
    });

    vm.$scope.exportBalances = [];
    vm.$scope.canExportBalances = false;
    Report.balances()
    .then(balances => {
      if(balances.length > 0) {
        vm.$scope.exportBalances = balances;
        vm.$scope.canExportBalances = true;
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
