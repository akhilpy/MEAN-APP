'use strict';

describe('Directive: widgetBenefits', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/widgetBenefits/widgetBenefits.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-benefits></widget-benefits>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetBenefits directive');
  }));
});
