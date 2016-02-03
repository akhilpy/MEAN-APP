'use strict';

class ApplicationController {
  constructor(Auth, Form) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.user = Auth.getCurrentUser();
    this.borrower = this.user.borrower;

    this.Form = Form;

    this.applicationFields = {
      one: this.Form.getApplicationPage(1),
      two: this.Form.getApplicationPage(2),
      three: this.Form.getApplicationPage(3),
      four: this.Form.getApplicationPage(4),
      five: this.Form.getApplicationPage(5)
    };

  }

  saveApplication(form) {
    var generalInfo = {};
    var listingDetails = {};
    var financial = {};
    var socialMedia = {};
    var terms = {};

    this.submitted = true;

    if( this.borrower.generalInfo ) {
      generalInfo = {
        businessName: this.borrower.generalInfo.businessName,
    		doingBusinessName: this.borrower.generalInfo.doingBusinessName,
    		contactName: this.borrower.generalInfo.contactName,
    		email: this.borrower.generalInfo.email,
    		phone: this.borrower.generalInfo.phone,
    		website: this.borrower.generalInfo.website,
    		address: this.borrower.generalInfo.address,
    		founded: this.borrower.generalInfo.founded,
    		structure: this.borrower.generalInfo.structure,
    		industry: this.borrower.generalInfo.industry,
    		naics: this.borrower.generalInfo.naics,
    		employees: this.borrower.generalInfo.employees
      };
    }

    if (form.$valid) {
      this.$http.put('/api/applications/' + this.user._id, {
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

  submitApplication(form) {
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
