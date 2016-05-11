'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var utilityCtrlStub = {
  index: 'utilityCtrl.index',
  show: 'utilityCtrl.show',
  create: 'utilityCtrl.create',
  update: 'utilityCtrl.update',
  destroy: 'utilityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var utilityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './utility.controller': utilityCtrlStub
});

describe('Utility API Router:', function() {

  it('should return an express router instance', function() {
    utilityIndex.should.equal(routerStub);
  });

  describe('GET /api/utilities', function() {

    it('should route to utility.controller.index', function() {
      routerStub.get
        .withArgs('/', 'utilityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/utilities/:id', function() {

    it('should route to utility.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'utilityCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/utilities', function() {

    it('should route to utility.controller.create', function() {
      routerStub.post
        .withArgs('/', 'utilityCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/utilities/:id', function() {

    it('should route to utility.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'utilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/utilities/:id', function() {

    it('should route to utility.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'utilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/utilities/:id', function() {

    it('should route to utility.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'utilityCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
