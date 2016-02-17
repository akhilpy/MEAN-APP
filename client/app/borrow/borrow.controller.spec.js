'use strict';

describe('Controller: BorrowController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var BorrowController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BorrowController = $controller('BorrowController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
