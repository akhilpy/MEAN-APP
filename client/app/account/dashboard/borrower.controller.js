'use strict';

(function() {

class BorrowerController {
  constructor(Auth, Borrower, Offers, ListingService, Payments, $scope, $timeout, socket, $stateParams, $state, $q, ngDialog, $http, Transactions, Emails) {
    var vm = this;

    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.ngDialog = ngDialog;
    this.$timeout = $timeout;
    this.socket = socket;
    this.Offers = Offers;
    this.Payments = Payments;
    this.Listings = ListingService;
    this.Emails = Emails;
    this.$scope.Borrower = Borrower;

    vm.$scope.loading = false;

    this.account = {};
    this.$scope.repayment = {};
    vm.$scope.totals = {};

    vm.$scope.transactions = [];
    vm.$scope.transactionSort = '-date';
    vm.addFundsError = false;
    vm.withdrawFundsError = false;

    if($stateParams.offer) {
      Offers.getOffer($stateParams.offer).then(response => {
        this.$scope.currentOffer = response.data;
      });
    }

    this.actions = {
      createListing: true,
      addAccount: true,
      verifyAccount: true
    }

    this.$scope.notifications = {
      actions: 0,
      listings: 0,
      offers: 0,
      repayments: 0,
      statements: 0,
      requests: 0
    };

    this.hasListings = false;
    this.hasOffers = false;
    this.hasRepayments = false;
    this.hasRequests = false;

    this.$scope.amountReached = false;
    this.$scope.loanComplete = false;
    this.$scope.totalOffers = 0;
    this.$scope.acceptedOffers = 0;

    Borrower.getInfo().then(borrowerInfo => {
      vm.$scope.borrowerInfo = borrowerInfo;
    });

    Borrower.getActions().then(actions => {
      var newActions = [];
      this.$scope.actions = actions;

      angular.forEach(actions, function(action) {
        if(action.status !== 'complete') {
          newActions.push(action);
        }
      });

      if(newActions.length > 0) {
        $scope.notifications.actions = newActions.length;
      }
    });

    Borrower.getApplications().then(listings => {
      var newListings = [];

      if(listings.length > 0) {
        this.$scope.listings = listings;
        this.actions.createListing = false;
        this.hasListings = true;
      }

      angular.forEach(listings, function(listing) {
        if(listing.admin.basics.status === 'approved') {
          newListings.push(listing);
        }
      });

      if(newListings.length > 0) {
        $scope.notifications.listings = newListings.length;
        $scope.publishListings = newListings;
      }
    });

    ListingService.getOne().then(listing => {
      vm.$scope.currentListing = listing.data;
      socket.syncUpdates('listing', this.$scope.currentListing);
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

    Borrower.getOffers().then(offers => {
      var vm = this;

      var activeOffers = offers.live;
      var acceptedOffers = offers.accepted;
      var fundingOffers = [];

      if(offers.live && offers.live.length > 0) {
        angular.forEach(offers.live, function(offer) {
          fundingOffers.push(offer);
        });
      }

      if(offers.accepted && offers.accepted.length > 0) {
        angular.forEach(offers.accepted, function(offer) {
          fundingOffers.push(offer);
          vm.$scope.acceptedOffers += offer.amount;
          if(vm.$scope.acceptedOffers >= vm.$scope.currentListing.details.amount) {
            vm.$scope.loanComplete = true;
          }
        });
      }

      if(fundingOffers.length > 0) {
        angular.forEach(fundingOffers, function(offer) {
          vm.$scope.totalOffers += offer.amount;
          if(vm.$scope.totalOffers >= vm.$scope.currentListing.details.amount) {
            vm.$scope.amountReached = true;
          }
        });
      }

      if(offers.live) {
        $scope.notifications.offers = offers.live.length;
      } else {
        $scope.notifications.offers = 0;
      }

      vm.$scope.offers = offers.all;

      if(offers.all && offers.all.length > 0) {
        vm.hasOffers = true;
      }

      if(offers.live && offers.live.length > 0) {
        vm.$scope.borrowerOffers = offers.live.length;
      } else {
        vm.$scope.borrowerOffers = 0;
      }

      if(offers.accepted && offers.accepted.length > 0) {
        Borrower.generateSchedule(offers.accepted, vm.$scope.currentListing.details.term)
        .then(response => {
          vm.$scope.repayment = response;
          vm.$scope.totals = vm.$scope.repayment.monthly;
        })
      }
    });

    Borrower.getRepayments()
    .then(response => {
      if(response.data && response.data[0]) {
        this.hasRepayments = true;
        this.$scope.repayment = response.data[0];
      }
    });

    Borrower.getRequests().then(allRequests => {
      var requests = [];
      var newRequests = [];

      if(allRequests.length > 0) {
        angular.forEach(allRequests, function(listingRequests) {
          angular.forEach(listingRequests, function(request) {
            request.listing = listingRequests.listing;
            request.name = listingRequests.name;
            requests.push(request);

            if(request.status === 'Pending') {
              newRequests.push(request);
            }
          });
        });

        this.$scope.requests = requests;

        if(requests.length > 0) {
          this.$scope.borrowerRequests = requests.length;
          this.hasRequests = true;
        } else {
          this.$scope.borrowerRequests = 0;
        }

        if(newRequests.length > 0) {
          this.$scope.notifications.requests = newRequests.length;
        }
      }
    });

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.getDate = function(index) {
      var now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + (1 + index), 1).toISOString();
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('offer');
    });

    Borrower.getInfo();
    Borrower.getStatements();
  }

  addBankAccount(account) {
    var vm = this;

    if(account) {
      vm.errors.addAccount = false;
      vm.$scope.loading = true;

      return vm.Payments.addAccount(account)
      .then(response => {
        if(response.data.status !== 'success') {
          return vm.Payments.updateAccount(account);
        }
      })
      .then(() => {
        return vm.Payments.verifyAccount(account)
        .then(response => {
          vm.$scope.loading = false;
          vm.$state.go('dashboard.borrower.actions.index');
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
        vm.actions.verifyAccount = false;
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

  publishListing(listing) {
    var vm = this;
    listing.admin.basics.status = 'active';
    listing.admin.basics.published = new Date();

    vm.Listings.publishOne(listing)
    .then(response => {
      var user = vm.$scope.currentUser;
      var email = {
        firstname: user.name.first,
        email: user.email,
        business: {
          name: listing.general.businessName,
          id: listing._id
        }
      };
      vm.Emails.listingPublished(email);
      vm.$state.go('dashboard.borrower.actions.index');
    })
  }

  rejectOffer(offer) {
    var vm = this;

    offer.status = 'rejected';
    return vm.Offers.updateOffer(offer)
    .then(() => {
      var email = {
        firstname: offer.user.name.first,
        email: offer.user.email,
        business: {
          name: offer.listing.general.businessName,
          id: offer.listing._id
        }
      }
      return vm.Emails.offerRejected(email);
    });
  }

  acceptOffer(offer) {
    var vm = this;

    offer.status = 'accepted';
    return vm.Offers.updateOffer(offer)
    .then(() => {
      var email = {
        firstname: offer.user.name.first,
        email: offer.user.email,
        business: {
          name: offer.listing.general.businessName,
          id: offer.listing._id
        }
      }
      return vm.Emails.offerAccepted(email);
      vm.$state.go('dashboard.borrower.offers')
      .then(() => {
        vm.socket.syncUpdates('offer', vm.$scope.offers);
      });
    })
  }

  rejectRequest(request) {
    var vm = this;
    request.status = 'Rejected';
    return this.$scope.Borrower.updateRequest(request)
    .then(response => {
      console.log(response);
      vm.$scope.notifications.requests -= 1;
      vm.socket.syncUpdates('request', vm.$scope.requests);
    });
  }

  approveRequest(request) {
    var vm = this;

    request.status = 'Approved';
    return this.$scope.Borrower.updateRequest(request)
    .then(() => {
      return vm.Listings.getCurrentUser(request.user)
      .then(user => {
        var email = {
          firstname: user.name.first,
          email: user.email,
          business: {
            name: vm.$scope.currentListing.general.businessName,
            id: vm.$scope.currentListing._id
          }
        };
        vm.Emails.listingInvestorApproved(email)
        .then(() => {
          vm.socket.syncUpdates('request', vm.$scope.requests);
        });
      });
    });
  }

  completeLoan() {
    var vm = this;

    if(vm.$scope.offers) {
      var offers = vm.$scope.offers;
      var acceptedOffers = [];
      var promises = [];

      angular.forEach(offers, function(offer) {
        if(offer.status === 'accepted') {
          offer.status = 'complete';
          promises.push(acceptedOffers.push(offer));
        } else {
          offer.status = 'rejected';
        }
        promises.push(vm.Offers.updateOffer(offer));
      });

      return this.$q.all(promises).then(function() {
        vm.$scope.Borrower.createSchedule(vm.$scope.currentListing, acceptedOffers, vm.$scope.totals)
        .then(response => {
          if(response.data[0]) {
            vm.$scope.repayments = response.data[0].borrower.payments;
            vm.hasRepayments = true;
          }
        });

        var email = {
          firstname: vm.$scope.currentUser.name.first,
          email: vm.$scope.currentUser.email,
          target: vm.$scope.currentListing.details.amount,
          fees: vm.serviceFees(vm.$scope.currentListing.details.amount),
          afterFees: vm.transferredAmount(vm.$scope.currentListing.details.amount)
        }
        vm.Emails.listingFundingComplete(email);

        vm.$scope.loanComplete = false;
        vm.socket.syncUpdates('offer', offers);
        vm.$state.go('dashboard.borrower.offers');
      });
    }
  }

  createListing() {
    var vm = this;
    vm.Listings.createOne({}).then(response => {
      var listingID = response.data._id;
      vm.$state.go('listing.general', {id: listingID});
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

  serviceFees(total) {
    return 500 + ((total * 3) / 100);
  }

  transferredAmount(total) {
    var serviceFees = 500 + ((total * 3) / 100);
    return total - serviceFees;
  }

}

angular.module('investnextdoorCaApp')
  .controller('BorrowerController', BorrowerController);

})();
