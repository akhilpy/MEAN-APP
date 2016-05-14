'use strict';

(function() {

class InvestorController {
  constructor(Investor, Offers, $scope, ListingService, $q, Payments, $state) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.ListingService = ListingService;
    this.Payments = Payments;
    this.$scope = $scope;
    this.$state = $state;

    this.hasInvestments = false;
    this.hasOffers = false;
    this.hasRepayments = false;
    this.hasBookmarks = false;

    vm.$scope.loading = false;

    this.actions = {
      addAccount: true,
      verifyAccount: true
    }

    Investor.getInvestorInfo().then(investorInfo => {
      this.$scope.investorInfo = investorInfo;
    });

    Offers.getUserOffers().then(offers => {
      if(offers.length > 0) {
        vm.$scope.offers = offers;
        vm.hasOffers = true;
      }
    });

    Offers.getUserInvestments().then(investments => {
      if(investments.length > 0) {
        vm.$scope.investments = investments;
        vm.hasInvestments = true;
      }
    });

    Investor.getRepayments().then(response => {
      var vm = this;
      var payments = [];
      var promises = [];

      angular.forEach(response, function(repayments) {
        angular.forEach(repayments.payments, function(repayment) {
          repayment.paymentDate = repayment.date;
          repayment.borrower = repayments.borrower;
          repayment.listing = repayments.listing;
          promises.push(payments.push(repayment));
        });
      });

      return $q.all(promises).then(function() {
        vm.$scope.repayments = payments;
        vm.hasRepayments = true;
      });
    });

    Investor.getBookmarks().then(bookmarks => {
      if(bookmarks.data.bookmarks.length > 0) {
        this.$scope.watchlist = bookmarks.data.bookmarks;
        this.hasBookmarks = true;
      }
    });

    ListingService.getCurrentUser()
    .then(user => {
      vm.$scope.currentUser = user;
      if(user.bankAccount.institution_number) {
        vm.actions.addAccount = false;
      }

      if(user.bankAccount.verified === true) {
        vm.actions.verifyAccount = false;
      }
    });

    this.$scope.statements = Investor.getStatements();
  }

  removeBookmark(listing) {
    this.ListingService.removeBookmark(listing);
    this.$scope.watchlist.splice(this.$scope.watchlist.indexOf(listing), 1);
  }

  addBankAccount(account) {
    var vm = this;

    if(account) {
      vm.errors.addAccount = false;
      vm.$scope.loading = false;

      return vm.Payments.addAccount(account)
      .then(response => {
        if(response.data.status !== 'success') {
          return vm.Payments.updateAccount(account);
        }
      })
      .then(() => {
        return vm.Payments.verifyAccount(account)
        .then(response => {
          vm.$state.go('dashboard.investor.actions.index');
        })
        .catch(err => {
          vm.$scope.loading = false;
          vm.errors.addAccount = 'Please check your account details and try again.';
        });
      })
      .catch(err => {
        vm.$scope.loading = false;
        vm.errors.addAccount = 'Please check your account details and try again.';
      });
    } else {
      vm.$scope.loading = false;
      vm.errors.addAccount = 'Please check your account details and try again.';
    }

  }

  confirmBankAccount() {
    var vm = this;
    vm.errors.verifyAccount = false;
    vm.$scope.loading = true;

    return vm.Payments.confirmAccount(vm.bankAmountA, vm.bankAmountB)
    .then(response => {
      if(response === true) {
        vm.$state.go('dashboard.borrower.actions.index');
      } else {
        vm.$scope.loading = false;
        vm.errors.verifyAccount = 'The provided values do not match the deposited amounts. Please verify and try again.';
      }
    })
    .catch(err => {
      vm.$scope.loading = false;
      vm.errors.verifyAccount = 'The provided values do not match the deposited amounts. Please verify and try again.';
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('InvestorController', InvestorController);

})();
