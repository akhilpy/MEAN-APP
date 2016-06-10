'use strict';

var app = require('../..');
import Listing from '../listing/listing.model';
import User from '../user/user.model';
import request from 'supertest';

var newListing;

describe('Listing API:', function() {
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

  describe('GET /api/listings', function() {
    var listings;
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
        .get('/api/listings')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          listings = res.body;
          token = res.body.token;
          done();
        });
    });

    it('should respond with JSON array', function() {
      listings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/listings', function() {
    var token;
    var listingId;

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
      newListing = new Listing({
        general: {
          businessName: 'New Listing',
          doingBusinessName: 'This is the brand new listing!!!'
        }
      });

      request(app)
        .post('/api/listings')
        .set('authorization', 'Bearer ' + token)
        .send({
          user: user,
          listing: newListing
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          newListing = res.body;
          done();
        });
    });

    it('should respond with the newly created listing', function() {
      newListing.general.businessName.should.equal('New Listing');
      newListing.general.doingBusinessName.should.equal('This is the brand new listing!!!');
    });

  });

  describe('GET /api/listings/:id', function() {
    var listing;

    beforeEach(function(done) {
      request(app)
        .get('/api/listings/' + newListing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          listing = res.body;
          done();
        });
    });

    afterEach(function() {
      listing = {};
    });

    it('should respond with the requested listing', function() {
      listing.general.businessName.should.equal('New Listing');
      listing.general.doingBusinessName.should.equal('This is the brand new listing!!!');
    });

  });

  describe('PUT /api/listings/:id', function() {
    var updatedListing;

    beforeEach(function(done) {
      request(app)
        .put('/api/listings/' + newListing._id)
        .send({
          general: {
            businessName: 'Updated Listing',
            doingBusinessName: 'This is the updated listing!!!',
          },
          terms: {
            termSheet: ''
          }
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedListing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedListing = {};
    });

    it('should respond with the updated listing', function() {
      updatedListing.general.businessName.should.equal('Updated Listing');
      updatedListing.general.doingBusinessName.should.equal('This is the updated listing!!!');
    });

  });

  describe('DELETE /api/listings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/listings/' + newListing._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when listing does not exist', function(done) {
      request(app)
        .delete('/api/listings/' + newListing._id)
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
