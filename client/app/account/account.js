'use strict';

angular.module('investnextdoorCaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'login',
        template: '',
        controller: function($state, Auth) {
          var referrer = 'login';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('dashboard.index', {
        url: '',
        templateUrl: 'app/account/dashboard/dashboard.index.html',
        authenticate: true
      })
      .state('dashboard.actions', {
        url: '/actions',
        templateUrl: 'app/account/dashboard/dashboard.actions.html',
        authenticate: true
      })
      .state('dashboard.investments', {
        url: '/investments',
        templateUrl: 'app/account/dashboard/dashboard.investments.html',
        authenticate: true
      })
      .state('dashboard.offers', {
        url: '/offers',
        templateUrl: 'app/account/dashboard/dashboard.offers.html',
        authenticate: true
      })
      .state('dashboard.statements', {
        url: '/statements',
        templateUrl: 'app/account/dashboard/dashboard.statements.html',
        authenticate: true
      })
      .state('dashboard.watchlist', {
        url: '/watchlist',
        templateUrl: 'app/account/dashboard/dashboard.watchlist.html',
        authenticate: true
      })
      .state('dashboard.agreements', {
        url: '/agreements',
        templateUrl: 'app/account/dashboard/dashboard.agreements.html',
        authenticate: true
      })
      .state('dashboard.pending', {
        url: '/pending',
        templateUrl: 'app/account/dashboard/dashboard.pending.html',
        authenticate: true
      })
      .state('profile', {
        url: '/account/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        authenticate: true
      })
      .state('listing', {
        url: '/account/listing',
        templateUrl: 'app/account/listing/listing.html',
        controller: 'ListingController',
        controllerAs: 'vm',
        abstract: true,
        authenticate: true
      })
      .state('listing.general', {
        url: '/general',
        templateUrl: 'app/account/listing/listing.general.html',
        authenticate: true
      })
      .state('listing.details', {
        url: '/details',
        templateUrl: 'app/account/listing/listing.details.html',
        authenticate: true
      })
      .state('listing.financial', {
        url: '/financial',
        templateUrl: 'app/account/listing/listing.financial.html',
        authenticate: true
      })
      .state('listing.social', {
        url: '/social',
        templateUrl: 'app/account/listing/listing.social.html',
        authenticate: true
      })
      .state('listing.terms', {
        url: '/terms',
        templateUrl: 'app/account/listing/listing.terms.html',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
