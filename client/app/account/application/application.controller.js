'use strict';

class ApplicationController {
  constructor($http, $state, socket, Auth, Form, Application) {
    var vm = this;
    vm.$http = $http;
    vm.$state = $state;
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
    };

  }

  saveApplication(form) {
    var vm = this;
    var currentPage = vm.$state.current.name;
    var savedApplication = {};

    if( vm.currentApplication.generalInfo ) {
      savedApplication.generalInfo = vm.pageData(vm.currentApplication, 'general');
    }

    if( vm.currentApplication.listingDetails ) {
      savedApplication.listingDetails = vm.pageData(vm.currentApplication, 'details');
    }

    if( vm.currentApplication.financial ) {
      savedApplication.financial = vm.pageData(vm.currentApplication, 'financial');
    }

    if( vm.currentApplication.socialMedia ) {
      savedApplication.socialMedia = vm.pageData(vm.currentApplication, 'social');
    }

    if( vm.currentApplication.terms ) {
      savedApplication.terms = vm.pageData(vm.currentApplication, 'terms');
    }

    vm.submitted = true;

    // if no existing application, create one
    if (form.$valid && !vm.applicationID) {
      vm.$http.post('/api/applications', {
        user: vm.user,
        application: savedApplication
      })
      .then((res) => {
        vm.applicationID = res.data._id;
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    // if there is an existing application, update it
    } else {
      vm.$http.put('/api/applications/' + vm.applicationID, savedApplication)
      .then((res) => {
        vm.$state.go(currentPage);
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

  submitApplication(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(() => {
          vm.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('ApplicationController', ApplicationController);
