'use strict';

describe('Controller: LenderController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var LenderController, LenderInfoController,  ConsumerLoanController, BusinessLoanController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LenderController = $controller('LenderController', {
      $scope: scope
    });
    LenderInfoController = $controller('LenderInfoController', {
      $scope: scope
    });
     ConsumerLoanController = $controller('ConsumerLoanController', {
       $scope: scope
   });
     BusinessLoanController = $controller('BusinessLoanController', {
       $scope: scope
   });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
