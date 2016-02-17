'use strict';

describe('Controller: BlogController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var BlogController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogController = $controller('BlogController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
