'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing, offers, ListingService, Auth, $scope, ngDialog) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.Auth = Auth;
    vm.$scope = $scope;
    vm.ngDialog = ngDialog;
    vm.currentListing = listing.data;
    vm.currentListing.link = window.location.href;
    vm.currentOffers = offers.data;
    vm.currentUser = Auth.getCurrentUser();
    vm.requested = false;
    vm.bookmarked = false;

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
        type:'number',
        max: 2.5,
        value: 1.2,
        unit: '',
        suffix: ''
      },
      revenue: [0, 10, 20, 30, 40, 50],
      probability: [0, 5, 10, 15, 20, 25]
    };

    // check if user has already requested more info
    if(vm.currentListing.infoRequest.length > 0) {
      angular.forEach(vm.currentListing.infoRequest, function(request) {
        if(request.user._id === vm.currentUser._id) {
          vm.requested = true;
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
  }

  bookmark() {
    if(!this.bookmarked) {
      this.ListingService.addBookmark(this.currentListing);
      this.bookmarked = true;
    }
  }

  requestDetails() {
    if(!this.requested) {
      this.ListingService.requestMore(this.currentListing);
      this.requested = true;
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
