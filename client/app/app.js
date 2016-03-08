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
  'ngMask',
  'formlyBootstrap',
  'slick',
  '720kb.socialshare',
  'angularMoment',
  'ngAnimate',
  'vAccordion',
  'ncy-angular-breadcrumb',
  'ngDialog',
  'investnextdoorCaApp.templates',
  'ui.sortable'
])
  .config(function($urlRouterProvider, $locationProvider, formlyConfigProvider, formlyFieldsProvider, $breadcrumbProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('chosen'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('date'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('repeater'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('dropzone'));
    formlyConfigProvider.setType(formlyFieldsProvider.$get().field('maskedInput'));

    $breadcrumbProvider.setOptions({
      template: '<div id="breadcrumbs" class="breadcrumbs__wrapper" xmlns:v="http://rdf.data-vocabulary.org/#"><ul class="breadcrumbs" typeof="v:Breadcrumb"><li ng-repeat="step in steps | limitTo:(steps.length-1)"><a href="{{step.ncyBreadcrumbLink}}" ng-bind-html="step.ncyBreadcrumbLabel"></a> » </li><li ng-repeat="step in steps | limitTo:-1" class="active"><span ng-bind-html="step.ncyBreadcrumbLabel"></span></li></ul></div>'
    });
  });
