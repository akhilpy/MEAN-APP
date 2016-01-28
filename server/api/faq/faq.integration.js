'use strict';

var app = require('../..');
import request from 'supertest';

var newFaq;

describe('Faq API:', function() {

  describe('GET /api/faqs', function() {
    var faqs;

    beforeEach(function(done) {
      request(app)
        .get('/api/faqs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          faqs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      faqs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/faqs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/faqs')
        .send({
          question: 'This is an FAQ question',
          answer: '<p>This is the response to the FAQ question. In other words, an answer!</p>'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFaq = res.body;
          done();
        });
    });

    it('should respond with the newly created faq', function() {
      newFaq.question.should.equal('This is an FAQ question');
      newFaq.answer.should.equal('<p>This is the response to the FAQ question. In other words, an answer!</p>');
    });

  });

  describe('GET /api/faqs/:id', function() {
    var faq;

    beforeEach(function(done) {
      request(app)
        .get('/api/faqs/' + newFaq._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          faq = res.body;
          done();
        });
    });

    afterEach(function() {
      faq = {};
    });

    it('should respond with the requested faq', function() {
      faq.question.should.equal('This is an FAQ question');
      faq.answer.should.equal('<p>This is the response to the FAQ question. In other words, an answer!</p>');
    });

  });

  describe('PUT /api/faqs/:id', function() {
    var updatedFaq;

    beforeEach(function(done) {
      request(app)
        .put('/api/faqs/' + newFaq._id)
        .send({
          question: 'This is an updated FAQ question',
          answer: '<p>This is the updated response to the FAQ question.</p>'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFaq = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFaq = {};
    });

    it('should respond with the updated faq', function() {
      updatedFaq.question.should.equal('This is an updated FAQ question');
      updatedFaq.answer.should.equal('<p>This is the updated response to the FAQ question.</p>');
    });

  });

  describe('DELETE /api/faqs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/faqs/' + newFaq._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when faq does not exist', function(done) {
      request(app)
        .delete('/api/faqs/' + newFaq._id)
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
