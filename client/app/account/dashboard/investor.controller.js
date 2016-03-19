'use strict';

(function() {

class InvestorController {
  constructor(Investor, Offers, $scope) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.$scope = $scope;

    this.hasOffers = false;
    this.hasBookmarks = false;
    //this.hasStatements = false;

    Investor.getInvestorInfo().then(investorInfo => {
      this.$scope.investorInfo = investorInfo;
    });

    Offers.getUserOffers().then(offers => {
      if(offers.data.length > 0) {
        this.$scope.offers = offers.data;
        this.hasOffers = true;
      }
    });

    Investor.getBookmarks().then(bookmarks => {
      if(bookmarks.data.bookmarks.length > 0) {
        this.$scope.watchlist = bookmarks.data.bookmarks;
        this.hasBookmarks = true;
      }
    });

    this.$scope.statements = Investor.getStatements();
  }
}

angular.module('investnextdoorCaApp')
  .controller('InvestorController', InvestorController);

})();
