'use strict';

var app = require('../..');
import Application from '../application/application.model';
import User from '../user/user.model';
import request from 'supertest';

var newApplication;

describe('Application API:', function() {
  var user;

  // Clear users before testing
  before('creating a user for testing', function() {
    return User.removeAsync().then(function() {
      user = new User({
        email: 'borrower@example.com',
        password: 'password',
        role: 'admin'
      });
      return user.saveAsync();
    });
  });

  // Clear users after testing
  after('removing test user', function() {
    return User.removeAsync();
  });

  describe('GET /api/applications', function() {
    var applications;
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'borrower@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    beforeEach(function(done) {
      request(app)
        .get('/api/applications')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          applications = res.body;
          token = res.body.token;
          done();
        });
    });

    it('should respond with JSON array', function() {
      applications.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/applications', function() {
    var token;
    var applicationId;

    beforeEach(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'borrower@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    beforeEach(function(done) {
      newApplication = new Application({
        generalInfo: {
          businessName: 'New Application',
          doingBusinessName: 'This is the brand new application!!!'
        }
      });

      request(app)
        .post('/api/applications')
        .set('authorization', 'Bearer ' + token)
        .send({
          user: user,
          application: newApplication
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          newApplication = res.body;
          done();
        });
    });

    it('should respond with the newly created application', function() {
      newApplication.generalInfo.businessName.should.equal('New Application');
      newApplication.generalInfo.doingBusinessName.should.equal('This is the brand new application!!!');
    });

  });

  describe('GET /api/applications/:id', function() {
    var application;

    beforeEach(function(done) {
      request(app)
        .get('/api/applications/' + newApplication._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          application = res.body;
          done();
        });
    });

    afterEach(function() {
      application = {};
    });

    it('should respond with the requested application', function() {
      application.generalInfo.businessName.should.equal('New Application');
      application.generalInfo.doingBusinessName.should.equal('This is the brand new application!!!');
    });

  });

  describe('PUT /api/applications/:id', function() {
    var updatedApplication;

    beforeEach(function(done) {
      request(app)
        .put('/api/applications/' + newApplication._id)
        .send({
          generalInfo: {
            businessName: 'Updated Application',
            doingBusinessName: 'This is the updated application!!!'
          }
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedApplication = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedApplication = {};
    });

    it('should respond with the updated application', function() {
      updatedApplication.generalInfo.businessName.should.equal('Updated Application');
      updatedApplication.generalInfo.doingBusinessName.should.equal('This is the updated application!!!');
    });

  });

  describe('DELETE /api/applications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/applications/' + newApplication._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when application does not exist', function(done) {
      request(app)
        .delete('/api/applications/' + newApplication._id)
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
