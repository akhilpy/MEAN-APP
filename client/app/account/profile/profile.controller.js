'use strict';

class ProfileController {
  constructor($http, Auth, $state, appConfig) {
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
    this.user = Auth.getCurrentUser();
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  updateInvestor(form) {
    this.submitted = true;
    console.log(this);

    if (form.$valid) {
      this.$http.put('/api/users/' + this.user._id, {
        username: this.user.username,
        email: this.user.email,
        name: {
          first: this.user.name.first,
          last: this.user.name.last
        }
      })
      .then(() => {
        this.$state.go('dashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  updateBorrower(form) {
    this.submitted = true;

    if (form.$valid) {
      this.$http.put('/api/users/' + this.user._id, {
        username: this.user.username,
        email: this.user.email,
        name: {
          first: this.user.name.first,
          last: this.user.name.last
        }
      })
      .then(() => {
        this.$state.go('dashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

}

angular.module('investnextdoorCaApp')
  .controller('ProfileController', ProfileController);
