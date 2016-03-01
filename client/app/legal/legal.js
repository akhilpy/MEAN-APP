'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('legal', {
        url: '/legal',
        templateUrl: 'app/legal/legal.html',
        controller: 'LegalController',
        abstract: true
      })
      .state('legal.termsofservice', {
        url: '/terms-of-service',
        templateUrl: 'app/legal/legal.terms-of-service.html',
        ncyBreadcrumb: {
          label: 'Terms of Service',
          parent: 'main'
        }
      })
      .state('legal.privacypolicy', {
        url: '/privacy-policy',
        templateUrl: 'app/legal/legal.privacy-policy.html',
        ncyBreadcrumb: {
          label: 'Privacy Policy',
          parent: 'main'
        }
      });
  });
