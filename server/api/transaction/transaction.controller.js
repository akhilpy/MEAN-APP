/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/transactions              ->  index
 * POST    /api/transactions              ->  create
 * GET     /api/transactions/:id          ->  show
 * PUT     /api/transactions/:id          ->  update
 * DELETE  /api/transactions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Transaction from './transaction.model';

// nightly cron to check payment status and collect payments
var CronJob = require('cron').CronJob;
new CronJob('00 01 00 * * *', function() {
  console.log('checking transaction status');
  console.log('collecting loan repayments');
}, null, true, 'America/Los_Angeles');

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Gets a list of Transactions
export function index(req, res) {
  return Transaction.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Transactions
export function user(req, res) {
  return Transaction.find({user: req.params.id}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Transactions
export function entry(req, res) {
  var entry = capitalizeFirstLetter(req.params.entry);

  return Transaction.find({entry: entry}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Transaction from the DB
export function show(req, res) {
  return Transaction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Transaction in the DB
export function create(req, res) {
  var transaction = req.body;

  if(transaction.type) {
    transaction.payment_type = transaction.type;
    delete transaction.type;
  }

  return Transaction.create(transaction)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Transaction in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Transaction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Transaction from the DB
export function destroy(req, res) {
  return Transaction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
