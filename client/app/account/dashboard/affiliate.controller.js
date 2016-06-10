'use strict';

(function() {

class AffiliateController {
  constructor($scope, Affiliate, ListingService) {
    var vm = this;
    vm.$scope = $scope;
    vm.Affiliate = Affiliate;
    vm.Listing = ListingService;
    vm.currentUser = {};
    vm.affiliate = {
      link: '',
      investors: [],
      investments: [],
      offers: [],
      borrowers: [],
      listings: [],
      loans: []
    };

    vm.$scope.sortType = '-date';
    vm.$scope.sortReverse = false;

    vm.Listing.getCurrentUser()
    .then(user => {
      vm.currentUser = user;
      vm.affiliate.link = window.location.origin + '/login?ref=' + user._id;

      vm.Affiliate.getInvestors(vm.currentUser._id)
      .then(investors => {
        vm.affiliate.investors = investors;
      });

      vm.Affiliate.getOffers(vm.currentUser._id)
      .then(offers => {
        vm.affiliate.offers = offers;
      });

      vm.Affiliate.getInvestments(vm.currentUser._id)
      .then(investments => {
        vm.affiliate.investments = investments;
      });

      vm.Affiliate.getBorrowers(vm.currentUser._id)
      .then(borrowers => {
        vm.affiliate.borrowers = borrowers;
      });

      vm.Affiliate.getListings(vm.currentUser._id)
      .then(listings => {
        vm.affiliate.listings = listings;
      });

      vm.Affiliate.getLoans(vm.currentUser._id)
      .then(loans => {
        vm.affiliate.loans = loans;
      });
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('AffiliateController', AffiliateController);

})();
