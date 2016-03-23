'use strict';

(function() {

class BorrowerController {
  constructor(Auth, Borrower, Offers, ListingService, $scope, $timeout, socket) {
    var vm = this;

    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.socket = socket;
    this.Offers = Offers;
    this.Listings = ListingService;
    this.Borrower = Borrower;

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

    this.$scope.totalOffers = 0;

    Borrower.getBorrowerInfo().then(borrowerInfo => {
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
      this.$scope.currentListing = listing.data;
      socket.syncUpdates('listing', this.$scope.currentListing);
    });

    Borrower.getOffers().then(allOffers => {
      var offers = [];
      var activeOffers = [];

      if(allOffers.length > 0) {
        angular.forEach(allOffers, function(listingOffers) {
          angular.forEach(listingOffers, function(offer) {
            offers.push(offer);

            if(offer.status !== 'rejected') {
              $scope.totalOffers += offer.amount;
              activeOffers.push(offer);
            }
          });
        });

        this.$scope.offers = offers;

        if(offers.length > 0) {
          this.hasOffers = true;
        }

        if(activeOffers.length > 0) {
          this.$scope.borrowerOffers = activeOffers.length;
        } else {
          this.$scope.borrowerOffers = 0;
        }
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

    this.$scope.statements = Borrower.getStatements();
  }

  confirmBankAccount() {
    var vm = this;

    return vm.Borrower.confirmBank(vm.bankAmount)
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
    offer.status = 'accepted';
    return this.Offers.updateOffer(offer);
  }

  rejectRequest(request) {
    var vm = this;
    request.status = 'Rejected';
    return this.Borrower.updateRequest(request).then(() => {
      vm.$scope.notifications.requests -= 1;
    });
  }

  approveRequest(request) {
    request.status = 'Approved';
    return this.Borrower.updateRequest(request);
  }
}

angular.module('investnextdoorCaApp')
  .controller('BorrowerController', BorrowerController);

})();
