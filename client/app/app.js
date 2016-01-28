'use strict';

angular.module('investnextdoorCaApp', [
  'investnextdoorCaApp.auth',
  'investnextdoorCaApp.admin',
  'investnextdoorCaApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'textAngular'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
