/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mails              ->  index
 * POST    /api/mails              ->  create
 * GET     /api/mails/:id          ->  show
 * PUT     /api/mails/:id          ->  update
 * DELETE  /api/mails/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import Mail from './mail.model';

var auth = {
  auth: {
    api_key: 'key-ae8fa6acad8d9cc65e01de349b8fe847',
    domain: 'mg.investnextdoor.ca'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

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

// Gets a list of Mails
export function index(req, res) {
  return Mail.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Mail from the DB
export function show(req, res) {
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Mail in the DB
export function create(req, res) {
  var email = req.body;
  return nodemailerMailgun.sendMail(email, function(err, info) {
    if(err) {
      console.log(err);
    } else {
      return Mail.create(email)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
    }
  });
}

// Updates an existing Mail in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Mail from the DB
export function destroy(req, res) {
  return Mail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
