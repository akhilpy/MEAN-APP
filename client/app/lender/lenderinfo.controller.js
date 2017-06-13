'use strict';

(function() {

  class LenderInfoController {
    constructor($scope, Lender) {
      var vm = this;
       vm.lenderDetails = Lender.getLenderDetails();
     
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('LenderInfoController', LenderInfoController);

})();
