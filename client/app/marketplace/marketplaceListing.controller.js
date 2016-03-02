'use strict';

(function() {

class MarketplaceListingController {
  constructor(listing, ListingService, Auth, $scope, ngDialog) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.Auth = Auth;
    vm.$scope = $scope;
    vm.ngDialog = ngDialog;
    vm.currentListing = listing.data;
    vm.currentListing.link = window.location.href;
    vm.currentUser = Auth.getCurrentUser();
    vm.requested = false;
    vm.bookmarked = false;

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

  makeOffer() {
    this.ngDialog.open({
      template: 'dialog.default',
      className: 'ngdialog-theme-default',
      scope: this.$scope
    });
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

  addReply(comment) {
    this.ListingService.addReply(this.currentListing, comment, comment.newReply);
    comment.newReply.date = new Date();
    comment.newReply.user = this.currentUser;
    comment.replies.push(comment.newReply);
    comment.hideComments = true;
    comment.newReply = '';
  }

}

angular.module('investnextdoorCaApp')
  .controller('MarketplaceListingController', MarketplaceListingController);

})();
