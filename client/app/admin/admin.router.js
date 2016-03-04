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
        abstract: true,
        authenticate: 'admin'
      })
      .state('admin.index', {
        url: '',
        templateUrl: 'app/admin/admin.index.html',
        ncyBreadcrumb: {
          label: 'Overview'
        },
        authenticate: 'admin'
      })
      .state('admin.listings', {
        url: '/listings',
        templateUrl: 'app/admin/admin.listings.html',
        resolve: {
          listings: function() { return []; }
        },
        abstract: true,
        authenticate: 'admin'
      })
      .state('admin.listings.index', {
        url: '',
        templateUrl: 'app/admin/admin.listings.status.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          listings: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getAll();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Listings',
          parent: 'admin.index'
        },
        authenticate: 'admin'
      })
      .state('admin.listings.status', {
        url: '/:status',
        templateUrl: 'app/admin/admin.listings.status.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          listings: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getAll($stateParams.status);
            }
          ]
        },
        ncyBreadcrumb: {
          label: '{{breadcrumb}}',
          parent: 'admin.listings.index'
        },
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
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'General',
          parent: 'admin.listings.index'
        },
        authenticate: 'admin'
      })
      .state('admin.editlisting.details', {
        url: '/:id/details',
        templateUrl: 'app/account/listing/listing.details.html',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Details',
          parent: 'admin.listings.index'
        },
        authenticate: 'admin'
      })
      .state('admin.editlisting.financial', {
        url: '/:id/financial',
        templateUrl: 'app/account/listing/listing.financial.html',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Financial',
          parent: 'admin.listings.index'
        },
        authenticate: 'admin'
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
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Terms',
          parent: 'admin.listings.index'
        },
        authenticate: 'admin'
      })
      .state('admin.editlisting.admin', {
        url: '/:id/admin',
        templateUrl: 'app/admin/admin.editlisting.admin.html',
        controller: 'AdminListingController',
        controllerAs: 'vm',
        resolve: {
          currentListing: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getOne($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Admin',
          parent: 'admin.listings.index'
        },
        authenticate: 'admin'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/admin.users.html',
        resolve: {
          users: function() { return []; }
        },
        abstract: true,
        authenticate: 'admin'
      })
      .state('admin.users.index', {
        url: '',
        templateUrl: 'app/admin/admin.users.role.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          users: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getUsers();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Users',
          parent: 'admin.index'
        },
        authenticate: 'admin',
      })
      .state('admin.users.role', {
        url: '/:role',
        templateUrl: 'app/admin/admin.users.role.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {
          users: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getUsers($stateParams.role);
            }
          ]
        },
        ncyBreadcrumb: {
          label: '{{breadcrumb}}',
          parent: 'admin.users.index'
        },
        authenticate: 'admin',
      })
      .state('admin.edituser', {
        url: '/user',
        templateUrl: 'app/admin/admin.edituser.html',
        authenticate: 'admin',
        abstract: true
      })
      .state('admin.edituser.profile', {
        url: '/:id/profile',
        templateUrl: 'app/admin/admin.edituser.profile.html',
        controller: 'AdminUserController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getUser($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'User Profile',
          parent: 'admin.users.index'
        },
        authenticate: 'admin'
      })
      .state('admin.edituser.admin', {
        url: '/:id/admin',
        templateUrl: 'app/admin/admin.edituser.admin.html',
        controller: 'AdminUserController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['$stateParams', 'ListingService',
            function($stateParams, ListingService) {
              return ListingService.getUser($stateParams.id);
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'User Admin',
          parent: 'admin.users.index'
        },
        authenticate: 'admin'
      })
  });
