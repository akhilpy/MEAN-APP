'use strict';

(function() {

class AdminUsersController {
  constructor($state, $rootScope, User) {
    var vm = this;
    vm.$state = $state;
    vm.role = vm.$state.params.role;


    // Use the User $resource to fetch all users
    if( vm.role ) {
      vm.users = User.role({ role: vm.role });
    } else {
      vm.users = User.query();
    }

    // refresh the state when changing tabs
    $rootScope.$on('$stateChangeSuccess', function() {
      vm.role = vm.$state.params.role;

      // Use the User $resource to fetch all users
      if( vm.role ) {
        vm.users = User.role({ role: vm.role });
      } else {
        vm.users = User.query();
      }
    });

  }

  delete(user) {
    user.$remove();
    vm.users.splice(vm.users.indexOf(user), 1);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminUsersController', AdminUsersController);

})();
