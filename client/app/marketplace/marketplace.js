'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'app/marketplace/marketplace.html',
        resolve: {
          listings: function() { return []; }
        },
        controller: 'MarketplaceController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('marketplace.index', {
        url: '',
        templateUrl: 'app/marketplace/marketplace.index.html',
        resolve: {
          listings: ['ListingService',
            function(ListingService) {
              return ListingService.getAll('approved');
            }
          ]
        },
        controller: 'MarketplaceController',
        controllerAs: 'vm'
      })
      .state('marketplace.listing', {
        url: '/listing/:id',
        templateUrl: 'app/marketplace/marketplace.listing.html',
        resolve: {
          listing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        controller: 'MarketplaceListingController',
        controllerAs: 'vm'
      });
  });
