'use strict';

describe('Controller: MarketplaceController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var MarketplaceController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketplaceController = $controller('MarketplaceController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
