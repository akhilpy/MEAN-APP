'use strict';

(function() {

class AdminController {
  constructor($http, $scope, socket, $stateParams, User) {
    var vm = this;

    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';

    vm.allListings = [];

    $http.get('/api/listings').success(function(allListings) {
      vm.allListings = allListings;
      socket.syncUpdates('listing', vm.allListings);
    });

  }

  delete(user) {
    user.$remove();
    vm.users.splice(vm.users.indexOf(user), 1);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminController', AdminController);

})();
