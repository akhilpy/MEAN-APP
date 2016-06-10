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
import mongoose from 'mongoose';
import async from 'async';

import Listing from './listing.model';
import Agreements from '../config/agreements.module';
import User from '../user/user.model';

var agreements = new Agreements();

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

  Listing.findAsync({ 'admin.basics.status': status })
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

// Gets a single Listing's user from the DB
export function showUser(req, res) {
  var listing = req.params.id;

  return User.findOne({
    'borrower.listings': listing
  })
  .exec()
  .then(user => {
    res.status(200).json(user);
  })
  .catch(handleError(res));
}

// Get all listings associated with an affiliate
export function affiliateListings(req, res) {
  var affiliate = req.params.id;
  var listings = [];

  return User.find({affiliate: affiliate})
  .populate('borrower.listings')
  .exec()
  .then(users => {
    async.forEach(users, function(user, callback) {
      if(user.borrower.listings.length > 0) {
        listings.push(user.borrower.listings[0]);
      }
      callback();
    }, function() {
      res.status(200).json(listings);
    });
  })
  .catch(handleError(res));
}

// Get all investments associated with an affiliate
export function affiliateInvestments(req, res) {
  var affiliate = req.params.id;
  var listings = [];

  return User.find({affiliate: affiliate})
  .exec()
  .then(users => {
    async.forEach(users, function(user, callback) {
      if(user.borrower.listings.length > 0) {
        listings.push(users.borrower.listings[0]);
      }
      callback();
    }, function() {
      res.status(200).json(listings);
    });
  })
  .catch(handleError(res));
}

// Creates a new Listing in the DB
export function create(req, res) {
  var userID = req.body.user._id;
  var newListing = new Listing(req.body.listing);

  User.findByIdAsync(userID)
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

  req.body.terms.termSheet = agreements.termSheet(req.body, req.params.id);

  Listing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Listing in the DB with comments
export function comment(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var newComment = req.body.comment;
  newComment.user = req.body.user._id;

  Listing.findByIdAndUpdate(req.params.id,
    {$push: {comments: newComment}},
    {safe: true, upsert: true},
  )
  .then(listing => {
    res.status(200).json(listing);
  });
}



// Deletes a comment from a listing
export function commentDelete(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var comment = req.body.comment;

  Listing.findByIdAndUpdate(req.params.id,
    {$pull: {comments: {_id: comment._id}}},
    {}
  )
  .then(listing => {
    res.status(200).json(listing);
  });
}




// Updates an existing Listing in the DB with comments
export function reply(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var comment = req.body.comment;
  var reply = req.body.reply;

  Listing.findOneAndUpdate(
    {comments: {"$elemMatch": {_id: comment._id}}},
    {$push: { "comments.$.replies":  reply }},
    function(err, listing) {
      if(err) {
        res.status(200).json({});
      }

      res.status(200).json(listing);
    }
  );
}



// Deletes a reply from a comment
export function replyDelete(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var comment = req.body.comment;
  var reply = req.body.reply;

  Listing.update(
    {_id: req.params.id, 'comments._id': comment._id },
    {$pull: {'comments.$.replies': {_id: reply._id} }},
    {},
    function(err, listing) {
      if(err) {
        res.status(200).json({});
      }

      res.status(200).json(listing);
    }
  );
}



// Updates an existing Listing with users that want more information
export var requestMore = {
  create: function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    var userID = req.body.user._id;
    var requester = {};

    User.findByIdAsync(userID)
      .then(user => {
        requester.user = user._id;
        Listing.findByIdAndUpdate(req.params.id,
          {$push: {infoRequest: requester}},
          {safe: true, upsert: true},
          function(err, listing) {
            if(err) {
              console.log(err);
            }
            respondWithResult(listing);
          });
      });
  },

  update: function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    var request = req.body.request;

    Listing.findOneAndUpdate(
      {infoRequest: {"$elemMatch": {_id: request._id}}},
      {$set: {'infoRequest.$.status': request.status}},
      function(err, listing) {
        if(err) {
          console.log(err);
        }
        res.status(200).json(listing);
      });
  }
};



// Updates an existing Listing in the DB with comments
export function bookmark(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var userID = req.body.user._id;
  var bookmark = {};

  Listing.findByIdAsync(req.params.id)
    .then(listing => {
      bookmark.listing = listing._id;
      User.findByIdAndUpdate(userID,
        {$push: {bookmarks: bookmark}},
        {safe: true, upsert: true},
        function(err, user) {
          if(err) {
            console.log(err);
          }
          respondWithResult(user);
        });
    });
}



// Updates an existing Listing in the DB with comments
export function bookmarkRemove(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var userID = req.params.id;
  var listing = req.body.listing;

  User.findByIdAndUpdate(userID,
    {$pull: {bookmarks: {listing: listing._id}}},
    {},
    function(err, user) {
      if(err) {
        console.log(err);
      }
      respondWithResult(user);
    });
}




// Deletes a Listing from the DB
export function destroy(req, res) {
  Listing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
