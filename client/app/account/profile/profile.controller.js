'use strict';

class ProfileController {
  constructor($http, Auth, $state, appConfig, Form) {
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

    this.Form = Form;

    this.investorProfile = this.Form.getInvestorProfile();
    this.borrowerProfile = this.Form.getBorrowerProfile();
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
    var address = {};
    var investor = {};

    this.submitted = true;

    if( this.user.address ) {
      address = {
        street: this.user.address.street,
        city: this.user.address.city,
        province: this.user.address.province,
        postal: this.user.address.postal
      };
    }

    if( this.user.investor ) {
      investor = {
        increase: this.user.investor.increase,
        notifications: this.user.investor.notifications,
        notes: this.user.investor.notes
      };
    }

    if (form.$valid) {
      this.$http.put('/api/users/' + this.user._id, {
        username: this.user.username,
        email: this.user.email,
        name: {
          first: this.user.name.first,
          last: this.user.name.last
        },
        phone: this.user.phone,
        social: this.user.social,
        dob: this.user.dob,
        address: address,
        investor: investor
      })
      .then(() => {
        this.$state.go('dashboard.index');
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
        this.$state.go('dashboard.index');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

}

angular.module('investnextdoorCaApp')
  .controller('ProfileController', ProfileController);
