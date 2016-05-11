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

    this.hasErrors = false;
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
    var changed = false;
    vm.submitted = true;


    if (form.$valid) {
      vm.hasErrors = false;
      vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        if(vm.user.oldPassword && vm.user.newPassword && vm.user.confirmPassword) {

          if(vm.user.newPassword === vm.user.confirmPassword) {

            vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
              .then(() => {
                vm.message = 'Password successfully changed.';
                vm.user.oldPassword = '';
                vm.user.newPassword = '';
                vm.user.confirmPassword = '';
                vm.$state.go('dashboard.index');
              })
              .catch(() => {
                form.password.$setValidity('mongoose', false);
                vm.errors.other = 'Incorrect password';
                vm.message = 'Your have entered the wrong password.';
                console.log('wrong password');
              });

          } else {

            vm.message = 'Your new passwords do not match.';
            console.log('no match');

          }

        } else if(vm.user.newPassword || vm.user.confirmPassword) {

          vm.message = 'You must enter your current password if you wish to update your password.';
          console.log('cannot change');

        } else {

          vm.$state.go('dashboard.index');

        }
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    } else {
      vm.hasErrors = true;
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
        if(vm.user.oldPassword && vm.user.newPassword && vm.user.confirmPassword) {

          if(vm.user.newPassword === vm.user.confirmPassword) {

            vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
              .then(() => {
                vm.message = 'Password successfully changed.';
                vm.user.oldPassword = '';
                vm.user.newPassword = '';
                vm.user.confirmPassword = '';
                vm.$state.go('dashboard.index');
              })
              .catch(() => {
                form.password.$setValidity('mongoose', false);
                vm.errors.other = 'Incorrect password';
                vm.message = 'Your have entered the wrong password.';
                console.log('wrong password');
              });

          } else {

            vm.message = 'Your new passwords do not match.';
            console.log('no match');

          }

        } else if(vm.user.newPassword || vm.user.confirmPassword) {

          vm.message = 'You must enter your current password if you wish to update your password.';
          console.log('cannot change');

        } else {

          vm.$state.go('dashboard.index');

        }
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
