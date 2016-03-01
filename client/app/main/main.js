'use strict';

angular.module('investnextdoorCaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        ncyBreadcrumb: {
          label: 'Home',
        }
      });
  });
