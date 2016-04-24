'use strict';

(function() {

class AdminLoanController {
  constructor(currentUser, $state, loans, $scope) {
    var vm = this;
    vm.$scope = $scope;

    vm.loans = loans;
    vm.user = currentUser;

    vm.$scope.sortType = 'date';
  }

  updateLoan(offer, status) {
    var vm = this;
    offer.status = status;
    vm.Loans.updateLoan(offer);
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminLoanController', AdminLoanController);

})();
