'use strict';

(function() {

class BorrowerController {
  constructor(Auth, Borrower, Offers, ListingService, Payments, $scope, $timeout, socket, $stateParams, $state, $q) {
    var vm = this;

    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;
    this.$q = $q;
    this.$state = $state;
    this.$timeout = $timeout;
    this.socket = socket;
    this.Offers = Offers;
    this.Listings = ListingService;
    this.Payments = Payments;
    this.$scope.Borrower = Borrower;

    this.account = {};
    this.$scope.repayment = {};
    vm.$scope.totals = {};

    if($stateParams.offer) {
      Offers.getOffer($stateParams.offer).then(response => {
        this.$scope.currentOffer = response.data;
      });
    }

    this.actions = {
      createListing: true
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
      this.$scope.borrowerInfo = borrowerInfo;
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
      }
    });

    ListingService.getOne().then(listing => {
      vm.$scope.currentListing = listing.data;
      socket.syncUpdates('listing', this.$scope.currentListing);
    });

    Borrower.getOffers().then(offers => {
      var vm = this;

      var activeOffers = offers.live;
      var acceptedOffers = offers.accepted;

      if(offers.live && offers.live.length > 0) {
        angular.forEach(offers.live, function(offer) {
          vm.$scope.totalOffers += offer.amount;
          if(vm.$scope.totalOffers >= vm.$scope.currentListing.details.amount) {
            vm.$scope.amountReached = true;
          }
        });
      }

      if(offers.accepted && offers.accepted.length > 0) {
        angular.forEach(offers.accepted, function(offer) {
          vm.$scope.acceptedOffers += offer.amount;
          if(vm.$scope.acceptedOffers >= vm.$scope.currentListing.details.amount) {
            vm.$scope.loanComplete = true;
          }
        });
      }

      if(offers.live) {
        $scope.notifications.offers = offers.live.length;
      } else {
        $scope.notifications.offers = 0;
      }

      vm.$scope.offers = offers.all;
      console.log(offers);

      if(offers.all && offers.all.length > 0) {
        vm.hasOffers = true;
      }

      if(offers.live && offers.live.length > 0) {
        vm.$scope.borrowerOffers = offers.live.length;
      } else {
        vm.$scope.borrowerOffers = 0;
      }

      if(offers.accepted && offers.accepted.length > 0) {
        vm.$scope.repayment = Borrower.generateSchedule(offers.accepted, vm.$scope.currentListing.details.term);
        vm.$scope.totals = vm.$scope.repayment.monthly;
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

  addBankAccount() {
    var vm = this;
    var account = vm.account;

    if(Object.keys(account).length === 3) {
      vm.errors.addAccount = false;

      return vm.Payments.addAccount(account)
      .then(response => {
        console.log(response);
        if(response.data.status === 'success') {
          console.log(response);
        } else if(response.data.status === 'error') {
          return vm.Payments.updateAccount(account)
          .then(response => {
            console.log(response);
          })
        }
      })
      .then(() => {
        return vm.Payments.verifyAccount(account)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      vm.errors.addAccount = 'Please complete all fields';
    }

  }

  confirmBankAccount() {
    var vm = this;

    return vm.$scope.Borrower.confirmBank(vm.bankAmount)
    .then(response => {
      if(response.data) {
        vm.$scope.currentUser = response.data[0];
        vm.$scope.actions = vm.Borrower.getActions(response.data[0]);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  publishListing(listing) {
    console.log('publish listing');
    listing.admin.basics.status = 'active';
    listing.admin.basics.published = new Date();
    return this.Listings.publishOne(listing);
  }

  rejectOffer(offer) {
    offer.status = 'rejected';
    return this.Offers.updateOffer(offer);
  }

  acceptOffer(offer) {
    var vm = this;

    offer.status = 'accepted';
    return vm.Offers.updateOffer(offer)
    .then(() => {
      vm.$state.go('dashboard.borrower.offers')
      .then(() => {
        vm.socket.syncUpdates('offer', vm.$scope.offers);
      });
    })
  }

  rejectRequest(request) {
    var vm = this;
    request.status = 'Rejected';
    return this.$scope.Borrower.updateRequest(request).then(() => {
      vm.$scope.notifications.requests -= 1;
    });
  }

  approveRequest(request) {
    request.status = 'Approved';
    return this.$scope.Borrower.updateRequest(request);
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
          acceptedOffers.push(offer);
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
        vm.$scope.loanComplete = false;
        vm.socket.syncUpdates('offer', offers);
        vm.$state.go('dashboard.borrower.offers');
      });
    }
  }

  createListing() {
    var vm = this;
    vm.Listings.createOne({});
    vm.$state.go('listing.general');
  }

}

angular.module('investnextdoorCaApp')
  .controller('BorrowerController', BorrowerController);

})();
