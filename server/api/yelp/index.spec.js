'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var yelpCtrlStub = {
  show: 'yelpCtrl.show',
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var yelpIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './yelp.controller': yelpCtrlStub
});

describe('Yelp API Router:', function() {

  it('should return an express router instance', function() {
    yelpIndex.should.equal(routerStub);
  });

  describe('GET /api/yelp/:id', function() {

    it('should route to yelp.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'yelpCtrl.show')
        .should.have.been.calledOnce;
    });

  });

});
