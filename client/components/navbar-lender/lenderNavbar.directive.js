'use strict';

angular.module('investnextdoorCaApp')
  .directive('navbarlender', () => ({
    templateUrl: 'components/navbar-lender/navbarLender.html',
    restrict: 'E',
    controller: 'NavbarLenderController',
    controllerAs: 'navs'
  }));
