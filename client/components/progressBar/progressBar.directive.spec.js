'use strict';

describe('Directive: progressBar', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/progressBar/progressBar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<progress-bar></progress-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the progressBar directive');
  }));
});
