'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing, ListingService, Auth) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.Auth = Auth;
    vm.currentListing = listing.data
    vm.currentListing.link = window.location.href;
    vm.currentUser = Auth.getCurrentUser();
    vm.requested = false;
    vm.bookmarked = false;

    // check if user has already requested more info
    if(vm.currentListing.infoRequest.length > 0) {
      angular.forEach(vm.currentListing.infoRequest, function(request, key) {
        if(request.user._id === vm.currentUser._id) {
          vm.requested = true;
        }
      });
    }

    // check if user has already bookmarked the listing
    if(vm.currentUser.bookmarks.length > 0) {
      angular.forEach(vm.currentUser.bookmarks, function(bookmark, key) {
        if(bookmark.listing === vm.currentListing._id) {
          vm.bookmarked = true;
        }
      });
    }
  }

  makeOffer() {
    console.log('make offer');
  }

  bookmark() {
    var vm = this;

    if(!vm.bookmarked) {
      vm.ListingService.addBookmark(vm.currentListing);
      vm.bookmarked = true;
    }
  }

  requestDetails() {
    var vm = this;

    if(!vm.requested) {
      vm.ListingService.requestMore(vm.currentListing);
      vm.requested = true;
    }
  }

  addComment() {
    var vm = this;

    if(vm.newComment) {

      if(vm.newComment.tags) {
        var tags = vm.newComment.tags.split(',');
        tags.forEach(function(value, index) {
          value.trim();
        });
        vm.newComment.tags = tags;
      }

      vm.ListingService.addComment(vm.newComment, vm.currentListing);
      vm.newComment.date = new Date();
      vm.newComment.user = vm.currentUser;
      vm.currentListing.comments.push(vm.newComment);
      vm.newComment = '';
    }
  }

  addReply(comment) {
    var vm = this;

    vm.ListingService.addReply(vm.currentListing, comment, comment.newReply);
    comment.newReply.date = new Date();
    comment.newReply.user = vm.currentUser;
    comment.replies.push(comment.newReply);
    comment.hideComments = true;
    comment.newReply = '';
  }

}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceListingController', MarketplaceListingController);

})();
