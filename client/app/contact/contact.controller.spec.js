'use strict';

describe('Controller: ContactController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var ContactController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactController = $controller('ContactController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
