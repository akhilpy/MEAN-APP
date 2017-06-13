'use strict';

(function() {

class SignupController {
  constructor(Auth, $state, $stateParams, appConfig, Form, ListingService, Emails) {
    var vm = this;
    this.ListingService = ListingService;
    this.Emails = Emails;
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

    this.signupErrors = false;
    this.loginErrors = false;

    this.affiliate = null;

    if($stateParams.ref) {
      this.affiliate = $stateParams.ref;
    }
  }

  // login(form) {
  //   var user = this.user;
  //   this.submitted = true;

  //   if (form.$valid) {
  //     this.loginErrors = false;
  //     this.Auth.login({
  //       email: user.email,
  //       password: user.password
  //     })
  //     .then(() => {
  //       // Logged in, redirect to home
  //       this.$state.go('dashboard.index');
  //     })
  //     .catch(err => {
  //       this.errors.other = err.message;
  //       this.loginErrors = true;
  //     });
  //   } else {
  //     this.loginErrors = true;
  //   }
  // }

  register(form) {
    var vm = this;
    var user = this.newUser;
    this.submitted = true;

    if (form.$valid) {
      vm.signupErrors = false;
      this.Auth.createUser({
        name: {
          first: user.name.first,
          last: user.name.last
        },
        email: user.email,
        password: user.password,
        role: user.role.value,
        affiliate: vm.affiliate
      })
      .then(() => {
        var email = {
          firstname: user.name.first,
          email: user.email
        }
        // Account created, redirect to welcome or home
        if(user.role.value === 'borrower') {
          vm.Emails.welcomeBorrower(email)
          .then(() => {
            this.$state.go('dashboard.index');
          })
        } else if(user.role.value === 'investor') {
          vm.Emails.welcomeInvestor(email)
          .then(() => {
            this.$state.go('profile');
          })
        } else if(user.role.value === 'affiliate') {
          vm.Emails.welcomeAffiliate(email)
          .then(() => {
            this.$state.go('dashboard.index');
          })
        } else {
          this.$state.go('dashboard.index');
        }
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
    } else {
      vm.signupErrors = true;
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('SignupController', SignupController);

})();
