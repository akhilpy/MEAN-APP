/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/yelp              ->  index
 * POST    /api/yelp              ->  create
 * GET     /api/yelp/:id          ->  show
 * PUT     /api/yelp/:id          ->  update
 * DELETE  /api/yelp/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import yelp from 'node-yelp';

var client = yelp.createClient({
  oauth: {
    consumer_key: process.env.YELP_consumer_key,
    consumer_secret: process.env.YELP_consumer_secret,
    token: process.env.YELP_token,
    token_secret: process.env.YELP_token_secret
  }
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a single Yelp from the DB
export function show(req, res) {
  client.business(req.params.id, {})
  .then(respondWithResult(res));
}
