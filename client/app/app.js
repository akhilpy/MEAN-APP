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
  'slick'
])
  .config(function($urlRouterProvider, $locationProvider, formlyConfigProvider, formlyFieldsProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('chosen'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('date'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('repeater'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('dropzone'));
  });
