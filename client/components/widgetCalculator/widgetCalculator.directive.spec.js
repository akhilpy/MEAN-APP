'use strict';

describe('Directive: widgetCalculator', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/widgetCalculator/widgetCalculator.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-calculator></widget-calculator>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetCalculator directive');
  }));
});
