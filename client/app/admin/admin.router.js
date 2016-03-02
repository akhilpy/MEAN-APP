'use strict';

angular.module('investnextdoorCaApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        resolve: {
          listings: function() { return []; },
          users: function() { return []; },
          currentListing: function() { return []; },
          currentUser: function() { return []; },
          status: function($stateParams) {
            return $stateParams.status;
          },
          role: function($stateParams) {
            return $stateParams.role;
          }
        },
        controller: 'AdminController',
        controllerAs: 'vm',
        abstract: true,
        authenticate: 'admin'
      })
      .state('admin.index', {
        url: '',
        templateUrl: 'app/admin/admin.index.html',
        authenticate: 'admin'
      })
      .state('admin.listings', {
        url: '/listings/:status',
        resolve: {
          listings: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getAll($stateParams.status);
            }
          ]
        },
        controller: 'AdminController',
        controllerAs: 'vm',
        templateUrl: 'app/admin/admin.listings.html',
        authenticate: 'admin'
      })
      .state('admin.editlisting', {
        url: '/listing',
        templateUrl: 'app/admin/admin.editlisting.html',
        authenticate: 'admin',
        abstract: true
      })
      .state('admin.editlisting.general', {
        url: '/:id/general',
        templateUrl: 'app/account/listing/listing.general.html',
        authenticate: 'admin',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        }
      })
      .state('admin.editlisting.details', {
        url: '/:id/details',
        templateUrl: 'app/account/listing/listing.details.html',
        authenticate: 'admin',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        }
      })
      .state('admin.editlisting.financial', {
        url: '/:id/financial',
        templateUrl: 'app/account/listing/listing.financial.html',
        authenticate: 'admin',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        }
      })
      .state('admin.editlisting.social', {
        url: '/:id/social',
        templateUrl: 'app/account/listing/listing.social.html',
        authenticate: 'admin',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        }
      })
      .state('admin.editlisting.terms', {
        url: '/:id/terms',
        templateUrl: 'app/account/listing/listing.terms.html',
        authenticate: 'admin',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        }
      })
      .state('admin.users', {
        url: '/users/:role',
        templateUrl: 'app/admin/admin.users.html',
        authenticate: 'admin',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          users: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getUsers($stateParams.role);
            }
          ]
        }
      })
  });
