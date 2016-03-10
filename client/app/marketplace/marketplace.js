'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'app/marketplace/marketplace.html',
        resolve: {
          listings: function() { return []; },
          offers: function() { return []; }
        },
        controller: 'MarketplaceController',
        controllerAs: 'vm',
        abstract: true,
        authenticate: true
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
        controllerAs: 'vm',
        authenticate: true
      })
      .state('marketplace.listing', {
        url: '/listing/:id',
        templateUrl: 'app/marketplace/marketplace.listing.html',
        resolve: {
          listing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ],
          offers: ['$stateParams', 'Offers',
            function($stateParams, Offers) {
              return Offers.getListingOffers($stateParams.id);
            }
          ]
        },
        controller: 'MarketplaceListingController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('marketplace.listing.profile', {
        url: '/profile',
        templateUrl: 'app/marketplace/marketplace.listing.profile.html',
        authenticate: true
      })
      .state('marketplace.listing.offer', {
        url: '/offer',
        templateUrl: 'app/marketplace/marketplace.listing.offer.html',
        authenticate: true
      })
      .state('marketplace.listing.financial', {
        url: '/financial',
        templateUrl: 'app/marketplace/marketplace.listing.financial.html',
        authenticate: true
      })
      .state('marketplace.listing.discussion', {
        url: '/discussion',
        templateUrl: 'app/marketplace/marketplace.listing.discussion.html',
        authenticate: true
      });
  });
