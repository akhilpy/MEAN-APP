'use strict';

describe('Controller: laonController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var laonController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    laonController = $controller('laonController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
