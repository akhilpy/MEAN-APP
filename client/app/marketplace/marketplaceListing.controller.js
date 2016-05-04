'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing, offers, ListingService, Auth, $scope, ngDialog, Offers, $q) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.Auth = Auth;
    vm.$scope = $scope;
    vm.ngDialog = ngDialog;
    vm.Offers = Offers;
    vm.currentListing = listing.data;
    vm.currentListing.link = window.location.href;
    vm.currentOffers = offers;
    vm.currentUser = Auth.getCurrentUser();

    vm.$scope.requested = false;
    vm.bookmarked = false;
    vm.hasManagers = false;
    vm.hasReviews = false;
    vm.hasOffers = false;
    vm.hasFiles = false;

    vm.$scope.viewFinancial = false;

    if(vm.currentListing.social.managers && vm.currentListing.social.managers.length > 0) {
      vm.hasManagers = true;
    }

    if(vm.currentListing.social.reviews && vm.currentListing.social.reviews.length > 0) {
      vm.hasReviews = true;
    }

    if(vm.currentListing.financial.additionalDocuments && vm.currentListing.financial.additionalDocuments.length > 0) {
      vm.hasFiles = true;
    }

    if(vm.currentOffers && vm.currentOffers.all.length > 0) {
      vm.hasOffers = true;
    }

    vm.meters = {
      years: {
        labels: [0, 2, 4, 6, 8, 10],
        type: 'date',
        max: 10,
        value: vm.currentListing.general.founded,
        unit: 'year',
        suffix: ' years'
      },
      cash: {
        labels: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5],
        type: 'number',
        max: 2.5,
        value: vm.currentListing.admin.bankStatements.cashFlow,
        unit: '',
        suffix: ''
      },
      revenue: {
        labels: [0, 10000000, 20000000, 30000000, 40000000, 50000000],
        type: 'number',
        max: 50000000,
        value: vm.currentListing.financial.revenue,
        unit: '$',
        suffix: ''
      },
      probability: {
        labels: [0, 5, 10, 15, 20, 25],
        type: 'number',
        max: 25,
        value: vm.currentListing.admin.scores.cds,
        unit: '',
        suffix: '%'
      }
    };

    vm.$scope.details = {
      funded: {
        amount: 0,
        percentage: 0
      },
      averageRate: 0,
      monthlyPayment: 0,
      totalRepayment: 0,
      monthlyFees: 0
    };

    // check if user has already requested more info
    if(vm.currentListing.infoRequest.length > 0) {
      var promises = [];
      var requestButton = 'Request Pending';
      var viewFinancial = false;
      angular.forEach(vm.currentListing.infoRequest, function(request) {
        if(request.user._id === vm.currentUser._id) {
          requestButton = 'Request ' + request.status;
          if(request.status === 'Approved') {
            viewFinancial = true;
          }
        }

        promises.push(request);
      });

      $q.all(promises).then(function() {
        vm.$scope.requested = requestButton;
        vm.$scope.viewFinancial = viewFinancial;
        return;
      });
    }

    // check if user has already bookmarked the listing
    if(vm.currentUser.bookmarks.length > 0) {
      angular.forEach(vm.currentUser.bookmarks, function(bookmark) {
        if(bookmark.listing === vm.currentListing._id) {
          vm.bookmarked = true;
        }
      });
    }

    vm.$scope.dialogModel = {
      title: 'Make an Offer',
      message: 'Details on your offer will be shown here.'
    }

    vm.Offers.getListingOffers(vm.currentListing._id)
    .then(offers => {
      var promises = [];
      var amountFunded = 0;
      angular.forEach(offers.all, function(offer, key) {
        if(offer.status !== 'pending' && offer.status !== 'outbid' && offer.status !== 'rejected') {
          amountFunded += offer.amount;
        }
        promises.push(offer);
      });

      return $q.all(promises).then(function() {
        var goal = vm.currentListing.details.amount;
        vm.$scope.details.funded.percentage = +((amountFunded / goal) * 100).toFixed(0);
        if(vm.$scope.details.funded.percentage > 100) {
          vm.$scope.details.funded.percentage = 100;
        }
        return;
      });
    });
  }

  makeNewOffer() {
    var vm = this;
    vm.ngDialog.open({
      template: 'app/marketplace/lightbox.offer.html',
      controller: 'WidgetOfferController',
      controllerAs: 'offerWidget',
      scope: vm.$scope
    });
  }

  bookmark() {
    if(!this.bookmarked) {
      this.ListingService.addBookmark(this.currentListing);
      this.bookmarked = true;
    } else {
      this.ListingService.removeBookmark(this.currentListing);
      this.bookmarked = false;
    }
  }

  requestDetails() {
    if(!this.$scope.requested) {
      this.ListingService.requestMore(this.currentListing);
      this.$scope.requested = 'Request Pending';
    }
  }

  addComment() {
    if(this.newComment) {

      if(this.newComment.tags) {
        var tags = this.newComment.tags.split(',');
        tags.forEach(function(value) {
          value.trim();
        });
        this.newComment.tags = tags;
      }

      this.ListingService.addComment(this.newComment, this.currentListing);
      this.newComment.date = new Date();
      this.newComment.user = this.currentUser;
      this.currentListing.comments.push(this.newComment);
      this.newComment = '';
    }
  }

  deleteComment(comment) {
    this.currentListing.comments.splice(this.currentListing.comments.indexOf(comment), 1);
    this.ListingService.deleteComment(comment, this.currentListing);
  }

  addReply(comment) {
    this.ListingService.addReply(this.currentListing, comment, comment.newReply);
    comment.newReply.date = new Date();
    comment.newReply.user = this.currentUser;
    comment.replies.push(comment.newReply);
    comment.hideComments = true;
    comment.newReply = '';
  }

  deleteReply(comment, reply) {
    var index = this.currentListing.comments.indexOf(comment);
    this.currentListing.comments[index].replies.splice(this.currentListing.comments[index].replies.indexOf(reply), 1);
    this.ListingService.deleteReply(comment, reply, this.currentListing);
  }

}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceListingController', MarketplaceListingController);

})();
