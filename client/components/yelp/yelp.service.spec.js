'use strict';

describe('Service: YelpService', function () {

  // load the service's module
  beforeEach(module('investnextdoorCaApp'));

  // instantiate service
  var YelpService;
  beforeEach(inject(function (_YelpService_) {
    YelpService = _YelpService_;
  }));

  it('should do something', function () {
    expect(!!YelpService).toBe(true);
  });

});
