'use strict';

(function() {

class ListingNavigationController {
  constructor($state, $scope) {
    var nav = this;
    nav.$scope = $scope;

    if($state.params) {
      nav.currentID = $state.params.id;
    }
  }

  saveForm() {
    var nav = this;
    nav.$scope.$emit('saveForm');
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingNavigationController', ListingNavigationController);

})();
