'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('invest', {
        url: '/invest',
        templateUrl: 'app/invest/invest.html',
        controller: 'InvestController'
      });
  });
