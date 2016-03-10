/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import aws from './api/config/aws.js';

export default function(app) {
  // Insert routes below
  app.use('/api/offers', require('./api/offer'));
  app.use('/api/payments', require('./api/payment'));
  app.use('/api/yelp', require('./api/yelp'));
  app.use('/api/blogs', require('./api/blog'));
  app.use('/api/faqs', require('./api/faq'));
  app.use('/api/blog', require('./api/blog'));
  app.use('/api/listings', require('./api/listing'));
  app.use('/api/users', require('./api/user'));
  app.get('/api/s3Policy', aws.getS3Policy);

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
