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
  'formlyBootstrap'
])
  .config(function($urlRouterProvider, $locationProvider, formlyConfigProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    formlyConfigProvider.setType({
      name: 'chosen',
      extends: 'select',
      template: '<select chosen="model[options.key]" data-placeholder="Select" class="form-control" disable-search-threshold="15" ng-model="model[options.key]"></select>'
    });

  });
