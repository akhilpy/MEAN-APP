'use strict';

angular.module('investnextdoorCaApp.auth', [
  'investnextdoorCaApp.constants',
  'investnextdoorCaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
