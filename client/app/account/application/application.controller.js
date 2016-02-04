'use strict';

class ApplicationController {
  constructor($http, $state, Auth, Form, Application) {
    this.$http = $http;
    this.$state = $state;
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.user = Auth.getCurrentUser();
    this.borrower = this.user.borrower;

    this.Application = Application;
    this.pageData = Application.pageData;
    this.applicationId = this.Application.getID();
    this.hasApplication = false;

    if( this.applicationId ) {
      this.hasApplication = true;
      this.application = Application.getApplication(this.applicationId);
    } else {
      this.application = {};
    }

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
    var savedApplication = {};
    var currentPage = this.$state.current.name;

    if( this.application.generalInfo ) {
      savedApplication.generalInfo = this.pageData(this.application, 'general');
    }

    if( this.application.listingDetails ) {
      savedApplication.listingDetails = this.pageData(this.application, 'details');
    }

    this.submitted = true;

    // if no existing application, create one
    if (form.$valid && !this.hasApplication) {
      this.$http.post('/api/applications', {
        user: this.user,
        application: savedApplication
      })
      .then(() => {
        this.hasApplication = true;
        this.$state.go(currentPage);
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    // if there is an existing application, update it
    } else {
      this.applicationId = this.Application.getID();
      this.$http.put('/api/applications/' + this.applicationId, savedApplication)
      .then(() => {
        this.$state.go(currentPage);
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
