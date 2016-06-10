/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/offers              ->  index
 * POST    /api/offers              ->  create
 * GET     /api/offers/:id          ->  show
 * PUT     /api/offers/:id          ->  update
 * DELETE  /api/offers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Offer from './offer.model';
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

// Gets a list of Offers
export function index(req, res) {
  Offer.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Offers by status
export function status(req, res) {
  var status = req.params.status;

  Offer.findAsync({status: status})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get all offers associated with an affiliate
export function affiliateOffers(req, res) {
  var affiliate = req.params.id;
  var offerStatus = ['pending', 'live', 'rejected', 'outbid'];

  return User.find({affiliate: affiliate})
  .exec()
  .then(users => {
    Offer.findAsync({user: {'$in': users}, status: {'$in': offerStatus}})
    .then(offers => {
      res.status(200).json(offers);
    })
    .catch(handleError(res));
  })
  .catch(handleError(res));
}

// Get all loans associated with an affiliate
export function affiliateLoans(req, res) {
  var affiliate = req.params.id;
  var loanStatus = ['accepted', 'repayment', 'complete'];

  return User.find({affiliate: affiliate})
  .exec()
  .then(users => {
    Offer.findAsync({user: {'$in': users}, status: {'$in': loanStatus}})
    .then(loans => {
      res.status(200).json(loans);
    })
    .catch(handleError(res));
  })
  .catch(handleError(res));
}

// Gets a list of Offers from a listing
export function listing(req, res) {
  var listingID = req.params.id;

  Offer.findAsync({listing: listingID})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Offers from a listing by status
export function listingStatus(req, res) {
  var listingID = req.params.id;
  var status = req.params.status;

  Offer.findAsync({listing: listingID, status: status})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Offers from a user
export function user(req, res) {
  var userID = req.params.id;

  Offer.findAsync({user: userID})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Offer from the DB
export function show(req, res) {
  Offer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Offer in the DB
export function create(req, res) {
  var userID = req.body.user._id;
  var newOffer = new Offer(req.body.offer);

  User.findByIdAsync(userID)
    .then(user => {
      newOffer.user = user;
      user.investor.balance -= newOffer.amount;
      user.investor.offers.push(newOffer);
      return Offer.createAsync(newOffer).then(offer => {
        user.saveAsync().then(() => {
          return offer;
        }).then(respondWithResult(res))
        .catch(handleError(res));
      });
    });
}


// Creates a new Offer in the DB
export function outbid(req, res) {
  var userID = req.body.user._id;
  var outbidOffer = req.body.offer;

  // update offer with outbid status and return the funds to the investor

  User.findByIdAsync(userID)
    .then(user => {
      newOffer.user = user;
      user.investor.balance += newOffer.amount;
      user.investor.offers.push(outbidOffer);
      return Offer.findByIdAsync(outbidOffer._id).then(offer => {
        user.saveAsync().then(() => {
          return offer;
        }).then(respondWithResult(res))
        .catch(handleError(res));
      });
    });
}


// Updates an existing Offer in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Offer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Offer from the DB
export function destroy(req, res) {
  Offer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
