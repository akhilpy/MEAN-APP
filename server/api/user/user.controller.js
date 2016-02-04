'use strict';

import User from './user.model';
import Application from '../application/application.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

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
      res.json(user.profile);
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
  var userId = req.user._id;

  User.findByIdAsync(userId)
    .then(user => {

      user.username = String(req.body.username);
      user.name.first = String(req.body.name.first);
      user.name.last = String(req.body.name.last);
      user.email = String(req.body.email);

      if( user.role === 'investor' ) {
        user.phone = String(req.body.phone);
        user.dob = String(req.body.dob);
        user.social = String(req.body.social);
        user.address = {
          street: String(req.body.address.street),
          city: String(req.body.address.city),
          province: String(req.body.address.province),
          postal: String(req.body.address.postal)
        };
        user.investor = {
          increase: String(req.body.investor.increase),
          notifications: String(req.body.investor.notifications),
          notes: String(req.body.investor.notes)
        };
      }

      return user.saveAsync()
        .then(() => {
          res.status(204).end();
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
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
