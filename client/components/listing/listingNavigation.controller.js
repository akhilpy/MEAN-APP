'use strict';

(function() {

class ListingNavigationController {

  pages = [
    {
      title: 'General Info',
      state: 'listing.general'
    },
    {
      title: 'Listing Details',
      state: 'listing.details'
    },
    {
      title: 'Financial',
      state: 'listing.financial'
    },
    {
      title: 'Social & Media',
      state: 'listing.social'
    },
    {
      title: 'Terms',
      state: 'listing.terms'
    }
  ];

  constructor($state, $scope) {
    var nav = this;
    nav.scope = $scope;
  }

  saveForm() {
    var nav = this;
    nav.scope.$emit('saveForm');
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingNavigationController', ListingNavigationController);

})();
