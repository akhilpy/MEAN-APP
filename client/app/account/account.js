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
      .state('application', {
        url: '/account/application',
        templateUrl: 'app/account/application/application.html',
        controller: 'ApplicationController',
        controllerAs: 'vm',
        abstract: true,
        authenticate: true
      })
      .state('application.new', {
        url: '/new',
        templateUrl: 'app/account/application/application.new.html',
        authenticate: true
      })
      .state('application.general', {
        url: '/general-info',
        templateUrl: 'app/account/application/application.general.html',
        authenticate: true
      })
      .state('application.details', {
        url: '/listing-details',
        templateUrl: 'app/account/application/application.details.html',
        authenticate: true
      })
      .state('application.financial', {
        url: '/financial',
        templateUrl: 'app/account/application/application.financial.html',
        authenticate: true
      })
      .state('application.social', {
        url: '/social-media',
        templateUrl: 'app/account/application/application.social.html',
        authenticate: true
      })
      .state('application.terms', {
        url: '/terms',
        templateUrl: 'app/account/application/application.terms.html',
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
