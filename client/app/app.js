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
  'textAngular',
  'formly',
  'formlyBootstrap',
  'ngMask'
])
  .config(function($urlRouterProvider, $locationProvider, formlyConfigProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('chosen'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('repeater'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('dropzone'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('maskedInput'));
  });
