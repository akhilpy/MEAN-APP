'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lender', {
        url: '/lender',
        templateUrl: 'app/lender/lender.html',
        controller: 'LenderController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('lender.index', {
        url: '',
        templateUrl: 'app/lender/lender.index.html',
        
      })
      .state('lender.info', {
        url: 'LenderInfo',
        templateUrl: 'app/lender/lenderinfo.html',
        controller: 'LenderInfoController',
        controllerAs: 'vm',
      })
      .state('lender.consumertermloan', {
        url: '/consumerTermLoan',
        templateUrl:'app/lender/consumerTermLoan.html',
        controller: 'ConsumerLoanController',
        controllerAs: 'vm',
      })
      .state('lender.consumermortgages', {
        url: '/consumerMortgags',
        templateUrl:'app/lender/consumerMortgages.html',
         controller: 'ConsumerLoanController',
      })
      .state('lender.consumercreditcardloan', {
        url: '/consumerCreditcardLoan',
        templateUrl:'app/lender/consumerCreditCardloan.html',
         controller: 'ConsumerLoanController',
      })
      .state('lender.consumerlinecreditloan', {
        url: '/consumerLineCreditLoan',
        templateUrl:'app/lender/consumerLineCreditloan.html',
         controller: 'ConsumerLoanController',

      })
      .state('lender.businesstermloan', {
        url: '/BusinessTermLoan',
        templateUrl:'app/lender/businessTermLoan.html',
         controller: 'BusinessLoanController',
         controllerAs: 'vm',
      })
      .state('lender.businesscreditcardloan', {
        url: '/BusinessCreditCardLoan',
        templateUrl:'app/lender/businessCreditCardloan.html',
        // controller: 'BusinessLoanController',
      })
      .state('lender.businesslinecreditloan', {
        url: '/BusinessLineCreditLoan',
        templateUrl:'app/lender/businessLineCreditloan.html',
        // controller: 'BusinessLoanController',
      })
      .state('lender.businessmortagagesloan', {
        url: '/BusinessMortgagesLoan',
        templateUrl:'app/lender/businessMortgagesloan.html',
        // controller: 'BusinessLoanController',
      })
  });
