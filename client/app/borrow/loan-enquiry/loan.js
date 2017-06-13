'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('borrow.loanEnquiry', {
        url: '/loanEnquiry',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.html',
        controller: 'laonController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('borrow.loanEnquiry.index', {
        url: '',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.welcomeguest.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.verification', {
        url: '/verification',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.verification.html',
		    controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.permission', {
        url: '/permission',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.permission.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.loan-type', {
        url: '/loanType',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.loan-type.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.term-loan', {
        url: '/termLoan',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.term-loan.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.linecreadit-loan', {
        url: '/linecreaditLoan',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.linecreadit-loan.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.mortgage-loan', {
        url: '/mortgageLoan',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.mortgage-loan.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.credit-card-loan', {
        url: '/creditcardLoan',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.credit-card-loan.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.processing', {
        url: '/processing',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.processing.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.req-approved', {
        url: '/reqApproved',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.req-approved.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.approval-processing', {
        url: '/approvalProcessingd',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.approval-processing.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.approval-cancel', {
        url: '/approvalCancel',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.approval-cancel.html',
        controller: 'laonController',
        controllerAs: 'vm'
      })
	  .state('borrow.loanEnquiry.approval-reject', {
        url: '/approvalReject',
        templateUrl: 'app/borrow/loan-enquiry/loanEnquiry.approval-reject.html',
        controller: 'laonController',
        controllerAs: 'vm'
      });
  });
