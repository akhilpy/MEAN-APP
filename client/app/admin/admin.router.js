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
