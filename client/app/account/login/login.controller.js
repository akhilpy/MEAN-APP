'use strict';

(function() {

class LoginController {
  constructor(Auth, $state, appConfig, Form, ListingService) {
    var vm = this;
    this.ListingService = ListingService;
    this.user = {};
    this.newUser = {};
    this.errors = {};
    this.submitted = false;

    this.roles = appConfig.ROLES;

    this.Auth = Auth;
    this.$state = $state;
    this.Form = Form;

    this.signupFields = this.Form.getSignup();
    this.loginFields = this.Form.getLogin();
  }

  login(form) {
    var user = this.user;
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: user.email,
        password: user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('dashboard.index');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  register(form) {
    var vm = this;
    var user = this.newUser;
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: {
          first: user.name.first,
          last: user.name.last
        },
        email: user.email,
        password: user.password,
        role: user.role.value
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('dashboard.index');
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

})();
