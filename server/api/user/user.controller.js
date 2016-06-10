'use strict';

import User from './user.model';
import Listing from '../listing/listing.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

var deepPopulate = require('mongoose-deep-populate')(mongoose);

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Get list of users by role
 * restriction: 'admin'
 */
export function role(req, res) {
  var role = req.params.role;

  User.findAsync({ role: role }, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Get list of affiliate users by role
 */
export function affiliate(req, res) {
  var affiliate = req.params.id;
  var role = req.params.role;

  User.findAsync({ affiliate: affiliate, role: role }, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}


/**
 * Change a users profile
 */
export function update(req, res, next) {
  var userID = req.body.user._id;
  var savedUser = req.body.user;

  var adminAttachments = savedUser['investor.adminAttachments'];

  User.findByIdAsync(userID)
    .then(user => {

      user.username = String(savedUser.username);
      user.name = savedUser.name;
      user.email = String(savedUser.email);
      user.balance = savedUser.balance;

      if(savedUser.newRole) {
        user.role = savedUser.newRole;
      }

      if(savedUser.bankAccount) {
        user.bankAccount = savedUser.bankAccount;
      }

      if( savedUser.role === 'investor' ) {
        if(savedUser.phone) {
          user.phone = String(savedUser.phone);
        }

        if(savedUser.dob) {
          user.dob = String(savedUser.dob);
        }

        if(savedUser.social) {
          user.social = String(savedUser.social);
        }

        if(savedUser.address) {
          user.address = savedUser.address;
        }

        if(savedUser.filters) {
          user.filters = savedUser.filters;
        }

        if(savedUser.investor) {
          user.investor = savedUser.investor;
          if(adminAttachments) {
            user.investor.adminAttachments = adminAttachments;
          }
        }

        if(savedUser.attachments) {
          user.attachments = savedUser.attachments;
        }
      }

      if( savedUser.role === 'borrower' ) {
        if(savedUser.borrower) {
          user.borrower = savedUser.borrower;
        }
      }

      return user.saveAsync()
        .then(user => {
          res.json(user);
        })
        .catch(validationError(res));
    });
}


/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}



/**
 * Get my bookmarks
 */
export function bookmarks(req, res, next) {
  var userId = req.user._id;

  User.findOne({ _id: userId })
    .deepPopulate('bookmarks.listing')
    .execAsync()
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}



/**
 * Set Last Login Time
 */
export function lastLogin(req, res, next) {
  var userId = req.user._id;

  User.findByIdAsync(userId)
  .then(user => {
    if (user) {
      user.lastActive = new Date().toISOString();
      return user.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}



/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}




/**
 * Confirm Bank Account
 */
export function confirmAccount(req, res, next) {
  var userID = req.user._id;

  User.findByIdAsync(userID)
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }

      if(user.role === 'borrower') {
        user.borrower.status = 'Active';
      } else if(user.role === 'investor') {
        user.investor.status = 'Active';
      }

      return user.saveAsync()
        .then(user => {
          res.json(user);
        })
        .catch(validationError(res));
    })
    .catch(err => next(err));
}



/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
