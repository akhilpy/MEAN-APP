'use strict';

describe('Controller: InvestController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var InvestController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvestController = $controller('InvestController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
