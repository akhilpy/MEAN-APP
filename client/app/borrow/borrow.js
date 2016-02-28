'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('borrow', {
        url: '/borrow',
        templateUrl: 'app/borrow/borrow.html',
        controller: 'BorrowController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('borrow.index', {
        url: '',
        templateUrl: 'app/borrow/borrow.index.html'
      })
      .state('borrow.welcome', {
        url: '/welcome',
        templateUrl: 'app/borrow/borrow.welcome.html'
      });
  });
