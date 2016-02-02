'use strict';

class ApplicationController {
  constructor(Auth, Form) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;

    this.Form = Form;

    this.applicationFields = {
      one: this.Form.getApplicationPage(1),
      two: this.Form.getApplicationPage(2),
      three: this.Form.getApplicationPage(3),
      four: this.Form.getApplicationPage(4),
      five: this.Form.getApplicationPage(5)
    }

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
}

angular.module('investnextdoorCaApp')
  .controller('ApplicationController', ApplicationController);
