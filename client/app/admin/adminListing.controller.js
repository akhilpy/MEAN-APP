'use strict';

(function() {

class AdminListingController {
  constructor(currentListing, ListingService, $stateParams, $state, Form, $scope, Offers, $q, Borrower, Emails) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.ListingService = ListingService;
    vm.Offers = Offers;
    vm.Emails = Emails;
    vm.Form = Form;

    vm.currentListing = currentListing.data;
    vm.listingID = vm.currentListing._id;

    if(Object.keys(currentListing).length !== 0) {
      vm.status = vm.currentListing.status;
    } else {
      vm.status = 'in-progress';
    }

    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.pageData = vm.ListingService.pageData;

    vm.options = {
      formState: {
        disabled: false
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
    }

    vm.Offers.getListingOffers(vm.listingID)
    .then(offers => {
      if(offers.all.length > 0) {
        vm.hasOffers = true;
        vm.$scope.offers = offers.all;
      }

      var promises = [];
      var amountFunded = 0;
      var averageRate = 0;
      var monthlyPayment = 0;
      var totalRepayment = 0;
      var monthlyFees = 0;
      angular.forEach(offers.all, function(offer, key) {
        if(offer.status !== 'pending' && offer.status !== 'outbid' && offer.status !== 'rejected') {
          amountFunded += offer.amount;
        }
        if(offer.status !== 'accepted' || offer.status !== 'completed' || offer.status !== 'unpaid' || offer.status !== 'closed') {
          monthlyPayment += offer.monthly.total;
          totalRepayment += offer.total;
          monthlyFees += offer.monthly.fees;
        }
        averageRate += offer.rate;
        promises.push(offer);
      });

      return $q.all(promises).then(function() {
        var goal = vm.currentListing.details.amount;
        vm.$scope.details.funded.amount = amountFunded;
        vm.$scope.details.monthlyPayment = +(monthlyPayment).toFixed(2);
        vm.$scope.details.monthlyFees = +(monthlyFees).toFixed(2);
        vm.$scope.details.totalRepayment = +(totalRepayment).toFixed(2);
        vm.$scope.details.funded.percentage = +((amountFunded / goal) * 100).toFixed(2);
        vm.$scope.details.averageRate = Math.ceil(averageRate / offers.all.length);
        return;
      });
    });

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms'),
      admin: vm.Form.getListingPage('admin')
    };

    vm.ListingService.getUserOne(vm.listingID)
    .then(user => {
      vm.currentBorrower = user;

      Borrower.getRepayments(user)
      .then(response => {
        if(response.data && response.data[0]) {
          this.hasRepayments = true;
          this.$scope.repayment = response.data[0];
        }
      });
    });



    vm.$scope.$on('saveForm', function() {
      var form = vm.$scope.listing;
      vm.saveListing(form);
    });
  }

  saveListing(form) {
    var vm = this;
    vm.$scope.saving = true;

    if(vm.currentListing.admin.basics.status === 'approved' && !vm.currentListing.admin.basics.approved) {

      vm.ListingService.getUserOne(vm.currentListing._id)
      .then(user => {
        var email = {
          firstname: user.name.first,
          email: user.email,
          business: {
            name: vm.currentListing.general.businessName,
            id: vm.currentListing._id
          }
        };
        vm.Emails.listingApproved(email);
      })

      var date = new Date;
      vm.currentListing.admin.basics.approved = date.toISOString();

    } else if(vm.currentListing.admin.basics.status === 'cancelled') {

      vm.ListingService.getUserOne(vm.currentListing._id)
      .then(user => {
        var email = {
          firstname: user.name.first,
          email: user.email,
          business: {
            name: vm.currentListing.general.businessName,
            id: vm.currentListing._id
          }
        };
        vm.Emails.listingRejected(email);
      });

    } else if(vm.currentListing.admin.basics.status === 'closed') {

      vm.ListingService.getUserOne(vm.currentListing._id)
      .then(user => {
        var email = {
          firstname: user.name.first,
          email: user.email,
          business: {
            name: vm.currentListing.general.businessName,
            id: vm.currentListing._id
          }
        };
        vm.Emails.listingCancelled(email);
      });

    }

    vm.submitted = true;
    vm.ListingService.saveOne(vm.currentListing)
    .then(data => {
      vm.$scope.saving = false;
    })
    .catch(err => {
      console.log(err);
    });
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminListingController', AdminListingController);

})();
