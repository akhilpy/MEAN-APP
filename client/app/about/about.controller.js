'use strict';

(function() {

  class AboutController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('AboutController', AboutController);

})();
