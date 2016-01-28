'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var faqCtrlStub = {
  index: 'faqCtrl.index',
  show: 'faqCtrl.show',
  create: 'faqCtrl.create',
  update: 'faqCtrl.update',
  destroy: 'faqCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var faqIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './faq.controller': faqCtrlStub
});

describe('Faq API Router:', function() {

  it('should return an express router instance', function() {
    faqIndex.should.equal(routerStub);
  });

  describe('GET /api/faqs', function() {

    it('should route to faq.controller.index', function() {
      routerStub.get
        .withArgs('/', 'faqCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/faqs/:id', function() {

    it('should route to faq.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'faqCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/faqs', function() {

    it('should route to faq.controller.create', function() {
      routerStub.post
        .withArgs('/', 'faqCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/faqs/:id', function() {

    it('should route to faq.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'faqCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/faqs/:id', function() {

    it('should route to faq.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'faqCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/faqs/:id', function() {

    it('should route to faq.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'faqCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
