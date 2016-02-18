'use strict';

(function() {

class ListingController {
  constructor($http, $rootScope, $state, socket, Auth, Form, Listing) {
    var vm = this;
    vm.$http = $http;
    vm.$state = $state;
    vm.errors = {};
    vm.submitted = false;
    vm.listingID = false;
    vm.saveListing = this.saveListing;
    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.Auth = Auth;
    vm.user = Auth.getCurrentUser();

    vm.Listing = Listing;
    vm.pageData = Listing.pageData;
    vm.getListing = Listing.getListing;
    vm.currentListing = Listing.getListing(vm.listingID);

    $rootScope.$on('$stateChangeSuccess', function(scope) {
      vm.currentPage = $state.current.name;
      vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);
    });

    $http.get('/api/users/me').then(response => {
      vm.user = response.data;
      vm.listingID = vm.user.borrower.listings[0];
      if( vm.listingID ) {
        $http.get('/api/listings/' + vm.listingID).then(response => {
          vm.currentListing = Listing.getListing(vm.listingID);
        });
      }
      socket.syncUpdates('user', vm.user);
    });

    vm.Form = Form;

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms')
    };

  }

  saveListing(form, currentPage) {
    var vm = this;
    var savedListing = {};

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

    // if no existing listing, create one
    if (form.$valid && !vm.listingID) {
      vm.$http.post('/api/listings', {
        user: vm.user,
        listing: savedListing
      })
      .then((res) => {
        vm.listingID = res.data._id;
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    // if there is an existing listing, update it
    } else {
      vm.$http.put('/api/listings/' + vm.listingID, savedListing)
      .then((res) => {
        vm.$state.go('listing.' + currentPage);
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

  submitListing(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(() => {
          vm.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingController', ListingController);

})();
