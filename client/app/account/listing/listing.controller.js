'use strict';

class ListingController {
  constructor($http, $state, $scope, socket, Auth, Form, Listing) {
    var vm = this;
    vm.$http = $http;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.errors = {};
    vm.submitted = false;
    vm.listingID = false;

    vm.Auth = Auth;
    vm.user = Auth.getCurrentUser();

    vm.Listing = Listing;
    vm.pageData = Listing.pageData;
    vm.getListing = Listing.getListing;
    vm.currentListing = Listing.getListing(vm.listingID);

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

  saveListing(form) {
    var savedListing = {};
    var currentPage = this.$state.current.name;

    if( this.listing.general ) {
      savedListing.general = this.pageData(this.listing, 'general');
    }

    if( this.listing.details ) {
      savedListing.details = this.pageData(this.listing, 'details');
    }

    if( this.listing.financial ) {
      savedListing.financial = this.pageData(this.listing, 'financial');
    }

    if( this.listing.social ) {
      savedListing.social = this.pageData(this.listing, 'social');
    }

    if( this.listing.terms ) {
      savedListing.terms = this.pageData(this.listing, 'terms');
    }

    this.submitted = true;

    // if no existing listing, create one
    if (form.$valid && !this.hasListing) {
      this.$http.post('/api/listings', {
        user: this.user,
        listing: savedListing
      })
      .then(() => {
        this.hasListing = true;
        this.listingId = this.Listing.getID();
        this.$state.go(currentPage);
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    // if there is an existing listing, update it
    } else {
      this.$http.put('/api/listings/' + this.listingId, savedListing)
      .then(() => {
        this.$state.go(currentPage);
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  submitListing(form) {
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
  .controller('ListingController', ListingController);
