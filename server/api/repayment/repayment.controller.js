/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/repayments              ->  index
 * POST    /api/repayments              ->  create
 * GET     /api/repayments/:id          ->  show
 * PUT     /api/repayments/:id          ->  update
 * DELETE  /api/repayments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Repayment from './repayment.model';

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
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
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

// Gets a list of Repayments
export function index(req, res) {
  return Repayment.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Repayments by Borrower ID
export function borrower(req, res) {
  var borrower = req.params.id;

  return Repayment.find({
    'borrower.user': borrower
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Repayments by Investor ID
export function investor(req, res) {
  var investor = req.params.id;

  return Repayment.find({
    investors: {"$elemMatch": {user: investor}}
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Repayment from the DB
export function show(req, res) {
  return Repayment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Repayment in the DB
export function create(req, res) {
  return Repayment.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Repayment in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Repayment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Repayment from the DB
export function destroy(req, res) {
  return Repayment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
