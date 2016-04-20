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
  }).exec()
    .then(respondWithResult(res))
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

  var userID = req.body.user._id;
  var newComment = req.body.comment;
  var listing = req.body.listing;

  User.findByIdAsync(userID)
    .then(user => {
      newComment.user = user._id;
      Listing.findByIdAndUpdate(req.params.id,
        {$push: {comments: newComment}},
        {safe: true, upsert: true},
        function(err, listing) {
          if(err) {
            console.log(err);
          }
          respondWithResult(listing);
        });
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
    {},
    function(err, listing) {
      if(err) {
        console.log(err);
      }
      respondWithResult(listing);
    });
}




// Updates an existing Listing in the DB with comments
export function reply(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var userID = req.body.user._id;
  var comment = req.body.comment;
  var reply = req.body.reply;

  User.findByIdAsync(userID)
    .then(user => {
      reply.user = user._id;

      Listing.update(
        {comments: {"$elemMatch": {_id: comment._id}}},
        {$push: { "comments.$.replies":  reply }},
        {upsert: false, safe: true},
        function(err, listing) {
          if(err) {
            console.log(err);
          }
        }
      );
    });
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
        console.log(err);
      }
      respondWithResult(listing);
    });
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

    Listing.update(
      {'infoRequest._id': request._id},
      {$set: {'infoRequest.$.status': request.status}},
      {},
      function(err, listing) {
        if(err) {
          console.log(err);
        }
        respondWithResult(listing);
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
