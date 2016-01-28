'use strict';

class LoginController {
  constructor(Auth, $state, appConfig) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.roles = appConfig.ROLES;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('dashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: {
          first: this.user.name.first,
          last: this.user.name.last
        },
        email: this.user.email,
        password: this.user.password,
        role: this.user.role.value
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('dashboard');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('LoginController', LoginController);
