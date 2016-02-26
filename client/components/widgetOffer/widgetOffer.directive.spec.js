'use strict';

describe('Directive: widgetOffer', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/widgetOffer/widgetOffer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-offer></widget-offer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetOffer directive');
  }));
});
