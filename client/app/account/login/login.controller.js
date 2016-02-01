'use strict';

class LoginController {
  constructor(Auth, $state, appConfig) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.roles = appConfig.ROLES;

    this.Auth = Auth;
    this.$state = $state;


    this.signupFields = [
      {
        className: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'name.first',
            templateOptions: {
              label: 'First Name',
              placeholder: 'First'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'name.last',
            templateOptions: {
              label: 'Last Name',
              placeholder: 'Last'
            },
            expressionProperties: {
              'templateOptions.disabled': '!model.name.first'
            }
          }
        ]
      },
      {
        className: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'email',
            templateOptions: {
              type: 'email',
              label: 'Email Address',
              placeholder: 'name@host.com'
            }
          },
          {
            className: 'flex-1',
            type: 'chosen',
            key: 'role',
            templateOptions: {
              label: 'Type of User',
              labelProp: 'label',
              valueProp: 'value',
              options: this.roles,
              ngOptions: 'option.name for option in to.options track by option.value',
              placeholder: 'Select'
            }
          }
        ]
      },
      {
        className: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'password',
            templateOptions: {
              type: 'password',
              label: 'Password',
              placeholder: 'Password'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'confirmPassword',
            templateOptions: {
              type: 'password',
              label: 'Confirm Password',
              placeholder: 'Password'
            }
          }
        ]
      }
    ];
  }

  onSubmit() {
    console.log(this.user.role.value);
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
        this.$state.go('dashboard.index');
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
