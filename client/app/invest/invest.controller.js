'use strict';

(function() {

  class InvestController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('InvestController', InvestController);

})();
