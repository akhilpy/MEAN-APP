'use strict';

(function() {

  class BorrowController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('BorrowController', BorrowController);

})();
