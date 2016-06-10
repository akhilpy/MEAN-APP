'use strict';

(function() {

class AdminUserController {
  constructor(currentUser, $state, Form, $http, socket, $rootScope) {
    var vm = this;
    vm.$http = $http;
    vm.$state = $state;
    vm.$rootScope = $rootScope;
    vm.socket = socket;
    vm.Form = Form;
    vm.user = currentUser;

    vm.investorProfile = vm.Form.getInvestorProfile();
    vm.investorAdmin = vm.Form.getInvestorAdmin();
    vm.borrowerProfile = vm.Form.getBorrowerProfile();
    vm.borrowerAdmin = vm.Form.getBorrowerAdmin();

    vm.user.newRole = currentUser.role;
  }

  updateInvestor(form) {
    var vm = this;
    vm.submitted = true;

    if(vm.user.investor.level === 'Accredited - Verified') {
      var email = {
        firstname: vm.user.name.first,
        email: vm.user.email,
        maxOffer: vm.user.investor.limit,
        maxLimit: vm.user.investor.limit
      };
      vm.Emails.investorStatusUpdate(email);
    }

    if (form.$valid) {
      return vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        vm.$state.go('admin.users.index');
        vm.$rootScope.$broadcast('updateUsers');
      })
      .catch(err => {
        console.log(err);
        vm.errors.other = err.message;
      });
    }
  }

  updateBorrower(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      return vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        vm.$state.go('admin.users.index');
        vm.$rootScope.$broadcast('updateUsers');
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminUserController', AdminUserController);

})();
