/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reports              ->  index
 * POST    /api/reports              ->  create
 * GET     /api/reports/:id          ->  show
 * PUT     /api/reports/:id          ->  update
 * DELETE  /api/reports/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Listing from '../listing/listing.model';
import Offer from '../offer/offer.model';
import User from '../user/user.model';
import async from 'async';
import momemt from 'moment';

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

// Listing Report
export function listings(req, res) {
  var returnedListings = [];

  Listing.find().lean().exec()
  .then(listings => {
    async.forEach(listings, function(listing, callback) {
      var term = '';
      if(listing.details.term) {
        term = listing.details.term + ' Months';
      }

      var city = '';
      if(listing.general.address && listing.general.address.city) {
        city = listing.general.address.city;
      }

      var province = '';
      if(listing.general.address && listing.general.address.province) {
        province = listing.general.address.province;
      }

      var submitted = '';
      if(listing.admin.basics.submitted) {
        submitted = listing.admin.basics.submitted;
      }

      var published = '';
      if(listing.admin.basics.published) {
        published = listing.admin.basics.published;
      }

      var completed = '';
      if(listing.admin.basics.completed) {
        completed = listing.admin.basics.completed;
      }

      var returnedListing = {
        id: listing._id || '',
        business: listing.general.businessName || '',
        status: listing.admin.basics.status || '',
        submitted: listing.admin.basics.submitted || '',
        published: published || '',
        completed: completed || '',
        amount: listing.details.amount || '',
        borrowerRate: listing.admin.basics.userRate || '',
        benchmarkRate: listing.admin.basics.benchmarkRate || '',
        term: term || '',
        closes: listing.admin.basics.deadline || '',
        type: listing.admin.basics.listingType || '',
        city: city || '',
        province: province || '',
        title: listing.details.title || '',
        email: '',
        phone: listing.general.phone || '',
        funded: 0,
        offers: 0,
        affiliate: '',
        amountFunded: 0
      };

      User.findOne({'borrower.listings': listing}).exec()
      .then(user => {
        if(user) {
          returnedListing.email = user.email;
        }
      });

      Offer.findAsync({listing: listing._id, status: {$in: ['pending', 'outbid', 'rejected']}})
      .then(offers => {
        async.forEach(offers, function(offer, callback) {
          returnedListing.offers++;
          returnedListing.amountFunded += offer.amount;
          callback();
        });
      })
      .then(() => {
        var goal = listing.details.amount;
        if(returnedListing.amountFunded) {
          returnedListing.funded = +((returnedListing.amountFunded / goal) * 100).toFixed(0);
          if(returnedListing.funded > 100) {
            returnedListing.funded = 100;
          }
        } else {
          returnedListing.funded = 0;
        }

        delete returnedListing.amountFunded;

        returnedListings.push(returnedListing);
        callback();
      });
    }, function() {
      res.status(200).json(returnedListings);
    });
  });
}

// User Report
export function users(req, res) {
  var returnedUsers = [];

  User.find({}, '-salt -password').populate('investor.offers').populate('investor.investments').lean().exec()
  .then(users => {
    async.forEach(users, function(user, callback) {
      var status = '';
      if(user.role === 'investor') {
        status = user.investor.status;
      } else if(user.role === 'borrower') {
        status = user.borrower.status;
      }

      var offers = [];
      var investments = [];
      var amountOffered = 0;
      var amountInvested = 0;
      if(user.investor && user.investor.offers) {
        if(user.investor.offers.length > 0) {
          async.forEach(user.investor.offers, function(offer, callback) {
            if(offer.status === 'accepted' || offer.status === 'repayment' || offer.status === 'complete') {
              investments.push(offer);
              amountInvested += offer.amount
            } else if(offer.status === 'pending' || offer.status === 'live' || offer.status === 'rejected' || offer.status === 'outbid') {
              offers.push(offer);
              amountOffered += offer.amount;
            }
            callback();
          });
        }
      }

      var returnedUser = {
        id: user._id,
        firstName: user.name.first || '',
        lastName: user.name.last || '',
        email: user.email || '',
        role: user.role || '',
        joined: user.joined || '',
        lastActive: user.lastActive || '',
        status: status || '',
        finappsid: '',
        listings: user.borrower.listings.length || 0,
        loaned: 0,
        offers: offers.length,
        amountOffered: amountOffered,
        investments: investments.length,
        amountInvested: amountInvested,
        affiliate: ''
      };

      returnedUsers.push(returnedUser);
      callback();

    }, function() {

    });
  })
  .then(() => {
    res.status(200).json(returnedUsers);
  })
}

// Transactions Report
export function transactions(req, res) {

}

// Balance Report
export function balances(req, res) {

}
