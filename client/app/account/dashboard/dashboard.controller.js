'use strict';

(function() {

class DashboardController {
  constructor(Auth, Investor, ListingService, Offers, $scope) {
    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;

    this.Auth = Auth;
    this.Investor = Investor;
    this.getCurrentUser = ListingService.getCurrentUser;
    this.isAdmin = Auth.isAdmin;
    this.isBorrower = Auth.isBorrower;
    this.isInvestor = Auth.isInvestor;

    this.$scope.investorInfo = Investor.getInvestorInfo();
    this.offers = Offers.getUserOffers();
    this.bookmarks = Investor.getBookmarks();
    this.statements = Investor.getStatements();

    this.getCurrentUser()
    .then(user => {
      this.$scope.currentUser = user;
    });

    this.hasOffers = false;
    this.hasBookmarks = false;

    if(this.offers.data) {
      this.$scope.offers = this.offers.data;
      if(this.offers.data.length > 0) {
        this.hasOffers = true;
      }
    } else {
      this.$scope.offers = [];
    }

    if(this.bookmarks.data) {
      this.$scope.watchlist = this.bookmarks.data.bookmarks;
      if(this.bookmarks.length > 0) {
        this.hasBookmarks = true;
      }
    } else {
      this.$scope.watchlist = [];
    }
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('DashboardController', DashboardController);

})();
