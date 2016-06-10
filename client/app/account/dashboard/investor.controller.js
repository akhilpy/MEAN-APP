'use strict';

(function() {

class InvestorController {
  constructor(Investor, Offers, $scope, ListingService, $q, Payments, $state, Transactions, ngDialog, $http) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.$q = $q;
    this.$http = $http;
    this.ngDialog = ngDialog;
    this.ListingService = ListingService;
    this.Payments = Payments;
    this.Transactions = Transactions;
    this.$scope = $scope;
    this.$state = $state;

    this.hasInvestments = false;
    this.hasOffers = false;
    this.hasRepayments = false;
    this.hasBookmarks = false;

    vm.$scope.loading = false;

    vm.$scope.transactions = [];
    vm.$scope.transactionSort = '-date';

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

      var promises = [];
      var filteredTransactions = [];

      Transactions.getUsers(user._id)
      .then(transactions => {
        angular.forEach(transactions, function(transaction, key) {
          if(transaction.entry !== 'Private') {
            if(transaction.entry === 'Debit') {
              transaction.debit = transaction.amount;
              transaction.credit = null;
            } else if (transaction.entry === 'Credit') {
              transaction.credit = transaction.amount;
              transaction.debit = null;
            }
            filteredTransactions.push(transaction);
          }
          promises.push(transaction);
        });
        vm.$q.all(promises).then(function() {
          vm.$scope.transactions = filteredTransactions;
        });
      });
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

    var valueA = (vm.bankAmountA * 100);
    var valueB = (vm.bankAmountB * 100);

    return vm.Payments.confirmAccount(valueA, valueB)
    .then(response => {
      if(response === true) {
        vm.$state.go('dashboard.investor.actions.index');
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

  addFundsPop() {
    var vm = this;
    vm.ngDialog.open({
      template: 'app/account/dashboard/borrower/lightbox.addFunds.html',
      scope: vm.$scope
    });
  }

  addFundsComplete() {
    var vm = this;

    var transaction = {
      user: vm.$scope.currentUser,
      method: 'AFI',
      amount: vm.addFundsAmount,
      type: 'direct_debit',
      kind: 'Deposit'
    }

    vm.Payments.createTransaction(transaction)
    .then(response => {
      if(response.status === 'success') {
        vm.$scope.currentUser.balance += vm.addFundsAmount;
        vm.$http.put('/api/users/' + vm.$scope.currentUser._id, {
          user: vm.$scope.currentUser
        })
        .then(response => {
          vm.ngDialog.close();
          vm.addFundsError = false;
        })
        .catch(err => {
          vm.addFundsErrorMessage = 'There was an error updating your balance.'
          vm.addFundsError = true;
        })
      }
    })
    .catch(err => {
      vm.addFundsErrorMessage = 'There was an error adding funds from your bank account.'
      vm.addFundsError = true;
    });
  }

  withdrawFundsPop() {
    var vm = this;
    vm.ngDialog.open({
      template: 'app/account/dashboard/borrower/lightbox.withdrawFunds.html',
      scope: vm.$scope
    });
  }

  withdrawFundsComplete() {
    var vm = this;

    var transaction = {
      user: vm.$scope.currentUser,
      method: 'WFI',
      amount: vm.withdrawFundsAmount,
      type: 'direct_credit',
      kind: 'Withdrawl'
    }

    vm.Payments.createTransaction(transaction)
    .then(response => {
      if(response.status === 'success') {
        vm.$scope.currentUser.balance -= vm.withdrawFundsAmount;
        vm.$http.put('/api/users/' + vm.$scope.currentUser._id, {
          user: vm.$scope.currentUser
        })
        .then(response => {
          vm.ngDialog.close();
          vm.withdrawFundsError = false;
        })
        .catch(err => {
          vm.withdrawFundsErrorMessage = 'There was an error updating your balance.'
          vm.withdrawFundsError = true;
        })
      } else if(response === false) {
        vm.withdrawFundsErrorMessage = 'Please check the amount you are trying to withdraw and try again.';
        vm.withdrawFundsError = true;
      }
    })
    .catch(err => {
      vm.withdrawFundsErrorMessage = 'There was an error withdrawing funds to your bank account.'
      vm.withdrawFundsError = true;
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('InvestorController', InvestorController);

})();
