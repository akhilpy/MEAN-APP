'use strict';

describe('Directive: applicationFormStatus', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/applicationFormStatus/applicationFormStatus.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<application-form-status></application-form-status>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the applicationFormStatus directive');
  }));
});
