'use strict';

var app = require('../..');
import request from 'supertest';

var newUtility;

describe('Utility API:', function() {

  describe('GET /api/utilities', function() {
    var utilitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/utilities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          utilitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      utilitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/utilities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/utilities')
        .send({
          name: 'New Utility',
          info: 'This is the brand new utility!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUtility = res.body;
          done();
        });
    });

    it('should respond with the newly created utility', function() {
      newUtility.name.should.equal('New Utility');
      newUtility.info.should.equal('This is the brand new utility!!!');
    });

  });

  describe('GET /api/utilities/:id', function() {
    var utility;

    beforeEach(function(done) {
      request(app)
        .get('/api/utilities/' + newUtility._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          utility = res.body;
          done();
        });
    });

    afterEach(function() {
      utility = {};
    });

    it('should respond with the requested utility', function() {
      utility.name.should.equal('New Utility');
      utility.info.should.equal('This is the brand new utility!!!');
    });

  });

  describe('PUT /api/utilities/:id', function() {
    var updatedUtility;

    beforeEach(function(done) {
      request(app)
        .put('/api/utilities/' + newUtility._id)
        .send({
          name: 'Updated Utility',
          info: 'This is the updated utility!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUtility = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUtility = {};
    });

    it('should respond with the updated utility', function() {
      updatedUtility.name.should.equal('Updated Utility');
      updatedUtility.info.should.equal('This is the updated utility!!!');
    });

  });

  describe('DELETE /api/utilities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/utilities/' + newUtility._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when utility does not exist', function(done) {
      request(app)
        .delete('/api/utilities/' + newUtility._id)
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
