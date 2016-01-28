'use strict';

describe('Controller: LegalCtrl', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var LegalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LegalCtrl = $controller('LegalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
