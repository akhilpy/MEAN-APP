/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/listings              ->  index
 * POST    /api/listings              ->  create
 * GET     /api/listings/:id          ->  show
 * PUT     /api/listings/:id          ->  update
 * DELETE  /api/listings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Listing from './listing.model';
import User from '../user/user.model';

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

// Gets a list of Listings
export function index(req, res) {
  Listing.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Listings by status
export function status(req, res) {
  var status = req.params.status;

  Listing.findAsync({ status: status })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Listing from the DB
export function show(req, res) {
  Listing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Listing in the DB
export function create(req, res) {
  var userId = req.body.user._id;
  var newListing = new Listing(req.body.listing);

  User.findByIdAsync(userId)
    .then(user => {
      user.borrower.listings.push(newListing);
      return Listing.createAsync(newListing).then(listing => {
        user.saveAsync().then(() => {
          return listing;
        }).then(respondWithResult(res))
        .catch(handleError(res));
      });
    });
}

// Updates an existing Listing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Listing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Listing from the DB
export function destroy(req, res) {
  Listing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
