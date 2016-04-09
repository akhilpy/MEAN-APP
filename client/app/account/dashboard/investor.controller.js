'use strict';

(function() {

class InvestorController {
  constructor(Investor, Offers, $scope, ListingService, $q) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.ListingService = ListingService;
    this.$scope = $scope;

    this.hasInvestments = false;
    this.hasOffers = false;
    this.hasRepayments = false;
    this.hasBookmarks = false;
    //this.hasStatements = false;

    Investor.getInvestorInfo().then(investorInfo => {
      this.$scope.investorInfo = investorInfo;
    });

    Offers.getUserOffers().then(response => {
      var allOffers = response.data;
      var offers = [];
      var investments = [];

      angular.forEach(allOffers, function(offer) {
        if(offer.status === 'complete') {
          investments.push(offer);
        } else {
          offers.push(offer);
        }
      });

      if(offers.length > 0) {
        vm.$scope.offers = offers;
        vm.hasOffers = true;
      }

      if(investments.length > 0) {
        vm.$scope.investments = investments;
        vm.hasInvestments = true;
      }
    });

    Investor.getRepayments().then(response => {
      var vm = this;
      var payments = [];
      var promises = [];

      angular.forEach(response, function(repayments) {
        angular.forEach(repayments.payments, function(repayment) {
          repayment.paymentDate = repayment.date;
          repayment.borrower = repayments.borrower;
          repayment.listing = repayments.listing;
          promises.push(payments.push(repayment));
        });
      });

      return $q.all(promises).then(function() {
        vm.$scope.repayments = payments;
        vm.hasRepayments = true;
      });
    });

    Investor.getBookmarks().then(bookmarks => {
      if(bookmarks.data.bookmarks.length > 0) {
        this.$scope.watchlist = bookmarks.data.bookmarks;
        this.hasBookmarks = true;
      }
    });

    this.$scope.statements = Investor.getStatements();
  }

  removeBookmark(listing) {
    this.ListingService.removeBookmark(listing);
  }
}

angular.module('investnextdoorCaApp')
  .controller('InvestorController', InvestorController);

})();
