'use strict';

var app = require('../..');
import request from 'supertest';

var newYelp;

describe('Yelp API:', function() {

  describe('GET /api/yelp/:id', function() {
    var yelp;
    var yelpID = 'the-snug-los-angeles';

    beforeEach(function(done) {
      request(app)
        .get('/api/yelp/' + yelpID)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          yelp = res.body;
          done();
        });
    });

    afterEach(function() {
      yelp = {};
    });

    it('should respond with the requested yelp', function() {
      yelp.name.should.equal('The Snug');
      yelp.is_claimed.should.equal(true);
    });

  });

});
