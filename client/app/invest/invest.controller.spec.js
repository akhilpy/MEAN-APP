'use strict';

describe('Controller: InvestCtrl', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var InvestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvestCtrl = $controller('InvestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
