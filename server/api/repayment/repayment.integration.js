'use strict';

var app = require('../..');
import request from 'supertest';

var newRepayment;

describe('Repayment API:', function() {

  describe('GET /api/repayments', function() {
    var repayments;

    beforeEach(function(done) {
      request(app)
        .get('/api/repayments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          repayments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      repayments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/repayments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/repayments')
        .send({
          status: 'Pending'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRepayment = res.body;
          done();
        });
    });

    it('should respond with the newly created repayment', function() {
      newRepayment.status.should.equal('Pending');
    });

  });

  describe('GET /api/repayments/:id', function() {
    var repayment;

    beforeEach(function(done) {
      request(app)
        .get('/api/repayments/' + newRepayment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          repayment = res.body;
          done();
        });
    });

    afterEach(function() {
      repayment = {};
    });

    it('should respond with the requested repayment', function() {
      repayment.status.should.equal('Pending');
    });

  });

  describe('PUT /api/repayments/:id', function() {
    var updatedRepayment;

    beforeEach(function(done) {
      request(app)
        .put('/api/repayments/' + newRepayment._id)
        .send({
          status: 'Complete'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRepayment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRepayment = {};
    });

    it('should respond with the updated repayment', function() {
      updatedRepayment.status.should.equal('Complete');
    });

  });

  describe('DELETE /api/repayments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/repayments/' + newRepayment._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when repayment does not exist', function(done) {
      request(app)
        .delete('/api/repayments/' + newRepayment._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
