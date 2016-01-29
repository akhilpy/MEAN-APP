'use strict';

class DashboardController {
  constructor(Auth, Investor) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.Investor = Investor;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isAdmin = Auth.isAdmin;
    this.isBorrower = Auth.isBorrower;
    this.isInvestor = Auth.isInvestor;
    this.statements = Investor.getStatements();
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
  .controller('DashboardController', DashboardController);
