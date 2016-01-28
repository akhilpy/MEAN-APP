'use strict';

(function() {

class MainController {
  image = 0;

  constructor($scope) {
    $scope.hero = {
      title: "It’s borrowing reinvented. It’s investing on your terms."
    }
    $scope.editMode = false;
    $scope.toggleEditMode = function() {
      $scope.editMode = $scope.editMode === false ? true: false;
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('MainController', MainController);

})();
