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
    var nav = this;
    nav.state = $state;
    nav.scope = $scope;
    nav.goBack = this.goBack;
    nav.goForward = this.goForward;
    nav.current = nav.state.current.name;
  }

  goBack() {
    var nav = this;
    var back = nav.pages[nav.current].prev;
    nav.state.go( back );
  }

  goForward() {
    var nav = this;
    var forward = nav.pages[nav.current].next;
    nav.state.go(forward);
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingPaginationController', ListingPaginationController);

})();
