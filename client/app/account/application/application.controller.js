'use strict';

class ApplicationController {
<<<<<<< Updated upstream
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
      general: this.Form.getApplicationPage('general'),
      details: this.Form.getApplicationPage('details'),
      financial: this.Form.getApplicationPage('financial'),
      social: this.Form.getApplicationPage('social'),
      terms: this.Form.getApplicationPage('terms')
=======
  constructor($http, $state, $scope, socket, Auth, Form, Application) {
    var vm = this;
    vm.$http = $http;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.errors = {};
    vm.submitted = false;
    vm.applicationID = false;

    vm.Auth = Auth;
    vm.user = Auth.getCurrentUser();

    vm.Application = Application;
    vm.pageData = Application.pageData;
    vm.getApplication = Application.getApplication;
    vm.currentApplication = Application.getApplication(vm.applicationID);

    $http.get('/api/users/me').then(response => {
      vm.user = response.data;
      vm.applicationID = vm.user.borrower.applications[0];
      if( vm.applicationID ) {
        $http.get('/api/applications/' + vm.applicationID).then(response => {
          vm.currentApplication = Application.getApplication(vm.applicationID);
        });
      }
      socket.syncUpdates('user', vm.user);
    });

    vm.Form = Form;

    vm.applicationFields = {
      general: vm.Form.getApplicationPage('general'),
      details: vm.Form.getApplicationPage('details'),
      financial: vm.Form.getApplicationPage('financial'),
      social: vm.Form.getApplicationPage('social'),
      terms: vm.Form.getApplicationPage('terms')
>>>>>>> Stashed changes
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

    if( this.application.financial ) {
      savedApplication.financial = this.pageData(this.application, 'financial');
    }

    if( this.application.socialMedia ) {
      savedApplication.socialMedia = this.pageData(this.application, 'social');
    }

    if( this.application.terms ) {
      savedApplication.terms = this.pageData(this.application, 'terms');
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
        this.applicationId = this.Application.getID();
        this.$state.go(currentPage);
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    // if there is an existing application, update it
    } else {
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
