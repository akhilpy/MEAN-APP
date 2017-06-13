'use strict';

angular.module('investnextdoorCaApp')
  .directive('navbarLoanenquiry',() => ({
    templateUrl: 'components/navbar-loanenquiry/navbar-loanenquiry.html',
    restrict: 'E',
    controller: 'NavbarLoanenquiryController',
    controllerAs: 'navs'
  }));
