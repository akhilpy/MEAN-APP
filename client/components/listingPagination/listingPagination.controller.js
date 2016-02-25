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

  constructor($state, $scope, ListingService) {
    var nav = this;
    nav.ListingService = ListingService;
    nav.state = $state;
    nav.scope = $scope;
    nav.goBack = this.goBack;
    nav.goForward = this.goForward;
    nav.current = nav.state.current.name;
  }

  goBack(listing, currentState) {
    var nav = this;
    var back = nav.pages[nav.current].prev;
    nav.scope.$emit('saveForm', [listing, currentState]);
    nav.state.go( back );
  }

  goForward(listing, currentState) {
    var nav = this;
    var forward = nav.pages[nav.current].next;
    nav.scope.$emit('saveForm', [listing, currentState]);
    nav.state.go(forward);
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingPaginationController', ListingPaginationController);

})();
