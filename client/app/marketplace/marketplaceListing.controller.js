'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing, offers, ListingService, Auth, $scope, ngDialog, Offers, $q, Emails, Affiliate) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.Auth = Auth;
    vm.Emails = Emails;
    vm.$scope = $scope;
    vm.ngDialog = ngDialog;
    vm.Offers = Offers;
    vm.Affiliate = Affiliate;
    vm.currentListing = listing.data;
    vm.currentListing.link = window.location.href;
    vm.currentOffers = offers;
    vm.currentUser = Auth.getCurrentUser();

    vm.currentListing.financial.expectedGrowth = (vm.currentListing.financial.projection / vm.currentListing.financial.revenue) * 100 - 100;

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
        if(request.user._id === vm.currentUser._id && !viewFinancial) {
          requestButton = 'Request ' + request.status;
          if(request.status === 'Approved') {
            viewFinancial = true;
          }
        }

        promises.push(request);
      });

      $q.all(promises).then(function() {
        if(!vm.$scope.viewFinancial) {
          vm.$scope.requested = requestButton;
          vm.$scope.viewFinancial = viewFinancial;
        }
        return;
      });
    }

    if(vm.Auth.isAffiliate()) {
      vm.Affiliate.getListings()
      .then(listings => {
        angular.forEach(listings, function(listing, key) {
          var breakLoop = false;
          if(listing._id === vm.currentListing._id && !breakLoop) {
            vm.$scope.viewFinancial = true;
            breakLoop = true;
          }
        })
      });
    }

    if(vm.Auth.isAdmin()) {
      vm.$scope.viewFinancial = true;
    } else if(vm.Auth.isBorrower() && vm.currentUser.borrower.listings.length > 0) {
      var breakLoop = false;
      angular.forEach(vm.currentUser.borrower.listings, function(listing, key) {
        if(listing === vm.currentListing._id && !breakLoop) {
          vm.$scope.viewFinancial = true;
          breakLoop = true;
        }
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
    var vm = this;

    if(!vm.bookmarked) {
      vm.ListingService.addBookmark(vm.currentListing);
      vm.bookmarked = true;
    } else {
      vm.ListingService.removeBookmark(vm.currentListing);
      vm.bookmarked = false;
    }
  }

  requestDetails() {
    var vm = this;

    if(!vm.$scope.requested) {
      vm.ListingService.requestMore(vm.currentListing);
      vm.$scope.requested = 'Request Pending';

      vm.ListingService.getUserOne(vm.currentListing._id)
      .then(user => {
        var email = {
          firstname: user.name.first,
          email: user.email,
          investor: {
            username: vm.currentUser.username,
            email: vm.currentUser.email,
            phone: vm.currentUser.phone,
            city: vm.currentUser.address.city,
            province: vm.currentUser.address.province,
            status: vm.currentUser.investor.status
          },
          business: {
            name: vm.currentListing.general.businessName,
            id: vm.currentListing._id
          }
        };
        vm.Emails.listingInvestorRequest(email);
      });

    }
  }

  addComment() {
    var vm = this;

    if(vm.newComment) {

      if(vm.newComment.tags) {
        var tags = vm.newComment.tags.split(',');
        tags.forEach(function(value) {
          value.trim();
        });
        vm.newComment.tags = tags;
      }

      vm.ListingService.addComment(vm.newComment, vm.currentListing, vm.currentUser)
      .then(listing => {
        vm.newComment.date = new Date();
        vm.newComment.user = vm.currentUser;
        vm.newComment.replies = [];
        vm.currentListing.comments.push(vm.newComment);

        vm.ListingService.getUserOne(vm.currentListing._id)
        .then(user => {
          var email = {
            firstname: user.name.first,
            author: vm.currentUser.username,
            comment: vm.newComment.text,
            email: user.email,
            business: {
              name: vm.currentListing.general.businessName,
              id: vm.currentListing._id
            }
          }
          vm.newComment = '';
          return vm.Emails.listingNewComment(email);
        });
      });
    }
  }

  deleteComment(comment) {
    var vm = this;

    vm.currentListing.comments.splice(vm.currentListing.comments.indexOf(comment), 1);
    vm.ListingService.deleteComment(comment, vm.currentListing);
  }

  addReply(comment) {
    var vm = this;
    var currentListing = vm.currentListing;

    var newComment = {
      date: new Date(),
      user: vm.currentUser,
      text: comment.newReply.text
    }

    vm.ListingService.addReply(currentListing, comment, newComment)
    .then(listing => {
      comment.replies.push(newComment);

      vm.ListingService.getUserOne(currentListing._id)
      .then(user => {
        var email = {
          firstname: user.name.first,
          author: vm.currentUser.username,
          comment: newComment.text,
          originalComment: comment.text,
          email: user.email,
          business: {
            name: currentListing.general.businessName,
            id: currentListing._id
          }
        }
        comment.newReply = '';
        return vm.Emails.listingCommentReply(email);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteReply(comment, reply) {
    var vm = this;

    var index = vm.currentListing.comments.indexOf(comment);
    vm.currentListing.comments[index].replies.splice(vm.currentListing.comments[index].replies.indexOf(reply), 1);
    vm.ListingService.deleteReply(comment, reply, vm.currentListing);
  }

  outputDeadline(listing) {
    return moment(listing.admin.basics.deadline).toNow(true);
  }

}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceListingController', MarketplaceListingController);

})();
