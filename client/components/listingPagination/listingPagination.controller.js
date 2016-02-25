'use strict';

(function() {

class ListingPaginationController {

  pages = {
    'listing.general': {
      'prev' : false,
      'next' : 'listing.details'
    },
    'listing.details': {
      'prev' : 'listing.general',
      'next' : 'listing.financial'
    },
    'listing.financial': {
      'prev' : 'listing.details',
      'next' : 'listing.social'
    },
    'listing.social': {
      'prev' : 'listing.financial',
      'next' : 'listing.terms'
    },
    'listing.terms': {
      'state': 'terms',
      'prev' : 'listing.social',
      'next' : false
    }
  };

  constructor($state, $scope) {
    var page = this;
    page.state = $state;
    page.scope = $scope;
    page.current = page.state.current.name;
  }

  goBack() {
    var page = this;
    var back = page.pages[page.current].prev;
    page.scope.$emit('saveForm');
    page.state.go( back );
  }

  goForward() {
    var page = this;
    var forward = page.pages[page.current].next;
    page.scope.$emit('saveForm');
    page.state.go(forward);
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingPaginationController', ListingPaginationController);

})();
