'use strict';

(function() {

class AdminUserController {
  constructor(currentUser, ListingService, $stateParams, $state, Form, $scope) {

    this.user = currentUser;

  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminUserController', AdminUserController);

})();
