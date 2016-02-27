'use strict';

describe('Directive: widgetPress', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/widgetPress/widgetPress.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-press></widget-press>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetPress directive');
  }));
});
