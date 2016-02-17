'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('borrow', {
        url: '/borrow',
        templateUrl: 'app/borrow/borrow.html',
        controller: 'BorrowController'
      });
  });
