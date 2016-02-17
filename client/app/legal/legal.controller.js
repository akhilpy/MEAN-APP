'use strict';

(function() {

  class LegalController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('LegalController', LegalController);

})();
