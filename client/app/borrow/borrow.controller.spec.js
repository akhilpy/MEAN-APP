'use strict';

describe('Controller: BorrowCtrl', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var BorrowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BorrowCtrl = $controller('BorrowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
