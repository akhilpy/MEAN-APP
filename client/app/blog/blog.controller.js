'use strict';

(function() {

  class BlogController {
    constructor($scope) {
      $scope.message = 'Hello';
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('BlogController', BlogController);

})();
