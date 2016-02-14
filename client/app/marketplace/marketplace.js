'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'app/marketplace/marketplace.html',
        controller: 'MarketplaceController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('marketplace.index', {
        url: '',
        templateUrl: 'app/marketplace/marketplace.index.html'
      })
      .state('marketplace.listing', {
        url: '/listing/:id',
        templateUrl: 'app/marketplace/marketplace.listing.html',
        controller: 'MarketplaceListingController',
        controllerAs: 'vm'
      });
  });
