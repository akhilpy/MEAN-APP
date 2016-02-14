'use strict';

angular.module('investnextdoorCaApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
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
        url: '/listings',
        templateUrl: 'app/admin/admin.listings.html',
        authenticate: 'admin',
        controller: 'AdminListingsController',
        controllerAs: 'vm',
      })
      .state('admin.listings.status', {
        url: '/:status',
        templateUrl: 'app/admin/admin.listings.html',
        authenticate: 'admin'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/admin.users.html',
        authenticate: 'admin',
        controller: 'AdminUsersController',
        controllerAs: 'vm',
        resolve: {
          role: function($stateParams) {
             return $stateParams.role;
          }
        }
      })
      .state('admin.users.role', {
        url: '/:role',
        templateUrl: 'app/admin/admin.users.html',
        authenticate: 'admin'
      });
  });
