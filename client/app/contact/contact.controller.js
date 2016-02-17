'use strict';

(function() {

  class ContactController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('ContactController', ContactController);

})();
