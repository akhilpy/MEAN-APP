'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var repaymentCtrlStub = {
  index: 'repaymentCtrl.index',
  show: 'repaymentCtrl.show',
  create: 'repaymentCtrl.create',
  update: 'repaymentCtrl.update',
  destroy: 'repaymentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var repaymentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './repayment.controller': repaymentCtrlStub
});

describe('Repayment API Router:', function() {

  it('should return an express router instance', function() {
    repaymentIndex.should.equal(routerStub);
  });

  describe('GET /api/repayments', function() {

    it('should route to repayment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'repaymentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/repayments/:id', function() {

    it('should route to repayment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'repaymentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/repayments', function() {

    it('should route to repayment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'repaymentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/repayments/:id', function() {

    it('should route to repayment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'repaymentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/repayments/:id', function() {

    it('should route to repayment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'repaymentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/repayments/:id', function() {

    it('should route to repayment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'repaymentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
