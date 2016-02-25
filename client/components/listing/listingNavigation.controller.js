'use strict';

(function() {

class ListingNavigationController {
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
