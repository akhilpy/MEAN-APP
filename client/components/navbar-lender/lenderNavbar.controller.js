'use strict';

class NavbarLenderController {
  constructor( $scope ) {
    var vm = this;
    vm.$scope = $scope;
   
    }
  }

angular.module('investnextdoorCaApp')
  .controller('NavbarLenderController', NavbarLenderController);
