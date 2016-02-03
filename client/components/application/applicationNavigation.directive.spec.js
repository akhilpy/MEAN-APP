'use strict';

describe('Directive: applicationFormNavigation', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/applicationFormNavigation/applicationFormNavigation.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<application-form-navigation></application-form-navigation>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the applicationFormNavigation directive');
  }));
});
