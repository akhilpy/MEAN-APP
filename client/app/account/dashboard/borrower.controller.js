'use strict';

(function() {

class BorrowerController {
  constructor(Auth, Borrower, Offers, ListingService, $scope, socket) {
    var vm = this;

    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;
    this.socket = socket;
    this.Offers = Offers;
    this.Listings = ListingService;
    this.Borrower = Borrower;

    this.hasListings = false;
    this.hasOffers = false;
    this.hasRepayments = false;
    this.hasRequests = false;

    Borrower.getBorrowerInfo().then(borrowerInfo => {
      this.$scope.borrowerInfo = borrowerInfo;
    });

    Borrower.getActions().then(actions => {
      this.$scope.actions = actions;
    });

    Borrower.getApplications().then(listings => {
      if(listings.length > 0) {
        this.$scope.listings = listings;
        this.hasListings = true;
      }
    });

    ListingService.getOne().then(listing => {
      this.$scope.currentListing = listing.data;
      socket.syncUpdates('listing', this.$scope.currentListing);
    });

    Borrower.getOffers().then(allOffers => {
      var offers = [];

      if(allOffers.length > 0) {
        angular.forEach(allOffers, function(listingOffers) {
          angular.forEach(listingOffers, function(offer) {
            offers.push(offer);
          });
        });

        this.$scope.offers = offers;

        if(offers.length > 0) {
          this.$scope.borrowerOffers = offers.length;
          this.hasOffers = true;
        } else {
          this.$scope.borrowerOffers = 0;
        }
      }
    });

    Borrower.getRequests().then(allRequests => {
      var requests = [];

      if(allRequests.length > 0) {
        angular.forEach(allRequests, function(listingRequests) {
          angular.forEach(listingRequests, function(request) {
            request.name = listingRequests.name;
            requests.push(request);
          });
        });

        this.$scope.requests = requests;

        if(requests.length > 0) {
          this.$scope.borrowerRequests = requests.length;
          this.hasRequests = true;
        } else {
          this.$scope.borrowerOffers = 0;
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
    request.status = 'Rejected';
    console.log('request rejected');
    return request;
  }

  approveRequest(request) {
    request.status = 'Approved';
    console.log('request approved');
    return request;
  }
}

angular.module('investnextdoorCaApp')
  .controller('BorrowerController', BorrowerController);

})();
