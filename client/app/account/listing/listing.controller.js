'use strict';

(function() {

class ListingController {
  constructor($state, $scope, Form, ListingService, currentUser, currentListing) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.ListingService = ListingService;
    vm.Form = Form;
    vm.errors = {};
    vm.submitted = false;
    vm.$scope.saving = false;

    vm.user = currentUser;
    vm.currentListing = currentListing.data;
    vm.listingID = vm.currentListing._id;

    if(Object.keys(currentListing).length !== 0) {
      vm.status = vm.currentListing.admin.basics.status;
    } else {
      vm.status = 'in-progress';
    }

    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.pageData = vm.ListingService.pageData;

    vm.options = {
      formState: {
        disabled: true
      }
    };
    if(vm.status == 'in-progress') {
      vm.options.formState.disabled = false;
    }

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms')
    };

    vm.$scope.$on('saveForm', function() {
      var form = vm.$scope.listing;
      vm.saveListing(form);
    });

  }

  saveListing(form) {
    var vm = this;
    var savedListing = {};
    vm.$scope.saving = true;

    if( vm.currentListing.general ) {
      savedListing.general = vm.pageData(vm.currentListing, 'general');
    }

    if( vm.currentListing.details ) {
      savedListing.details = vm.pageData(vm.currentListing, 'details');
    }

    if( vm.currentListing.financial ) {
      savedListing.financial = vm.pageData(vm.currentListing, 'financial');
    }

    if( vm.currentListing.social ) {
      savedListing.social = vm.pageData(vm.currentListing, 'social');
    }

    if( vm.currentListing.terms ) {
      savedListing.terms = vm.pageData(vm.currentListing, 'terms');
    }

    vm.submitted = true;

    vm.ListingService.saveOne(savedListing, vm.listingID)
    .then(data => {
      vm.$scope.saving = false;
    })
    .catch(err => {
      console.log(err);
    });

  }

  submitListing(form) {
    var vm = this;
    vm.submitted = true;
    vm.saveListing(form);
    vm.ListingService.submitOne(vm.listingID)
    .then(() => {
      var html = '<p>Hello ' + vm.user.name.first + ',</p><p>Your listing has been submitted.  In order to process your application the following steps need to be completed:</p><p>1. Verify your Bank Account - within 3 days you will recieve two small deposits in your bank account.  You will need to enter these amounts in your dashboard ' + vm.currentListing.general.businessName + '<br>.2. Owners with >25% ownership will need to complete a personal gaurantee form which has been emailed to them.</p><p>Once your account has been verified and we receive the owner forms we will process your application. You should expect a response within 2 business days.  You will then be able to review, update and publish your listing.</p><p>Don\'t hesitate to let us know if you have questions.</p><p>Thank you,<br>The InvestNextDoor Team</p>';
      var email = {
        to: vm.user.email,
        subject: 'Your listing has been submitted.',
        html: html
      }
    });
    vm.$state.go('dashboard.index');
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingController', ListingController);

})();
