'use strict';

describe('Service: formFields', function () {

  // load the service's module
  beforeEach(module('investnextdoorCaApp'));

  // instantiate service
  var formFields;
  beforeEach(inject(function (_formFields_) {
    formFields = _formFields_;
  }));

  it('should do something', function () {
    expect(!!formFields).toBe(true);
  });

});
