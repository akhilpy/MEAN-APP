'use strict';

(function() {

class ProfileController {
  constructor($http, Auth, $state, appConfig, Form, currentUser) {
    this.$http = $http;
    this.$state = $state;
    this.errors = {};
    this.submitted = false;

    this.provinces = appConfig.PROVINCES;

    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isAdmin = Auth.isAdmin;
    this.isBorrower = Auth.isBorrower;
    this.isInvestor = Auth.isInvestor;
    this.user = currentUser;

    this.Form = Form;

    this.investorProfile = this.Form.getInvestorProfile();
    this.borrowerProfile = this.Form.getBorrowerProfile();
  }

  changePassword(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(() => {
          vm.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
    }
  }

  updateInvestor(form) {
    var vm = this;
    var address = {};
    var investor = {};

    vm.submitted = true;

    if (form.$valid) {
      vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        vm.$state.go('dashboard.index');
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

  updateBorrower(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        vm.$state.go('dashboard.index');
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

}

angular.module('investnextdoorCaApp')
  .controller('ProfileController', ProfileController);

})();
