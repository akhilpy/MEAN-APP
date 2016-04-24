'use strict';

import crypto from 'crypto';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

var shortid = require('shortid');

import {Schema} from 'mongoose';

var autopopulate = require('mongoose-autopopulate');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const authTypes = ['github', 'twitter', 'facebook', 'google'];

var bankAccount = {
	institution_number: Number,
	branch_number: Number,
	account_number: Number,
	verified: {
		type: Boolean,
		default: false
	},
	verification: {
		micro_debit_1: Number,
		micro_debit_2: Number
	}
}

var address = {
	street: String,
	city: String,
	province: String,
	postal: String
};

var file = {
	name: String,
	link: String,
	size: String
};

var bookmark = {
	listing: {
		type: Schema.ObjectId,
		ref: 'Listing'
	},
	date: {
		type: Date,
		default: Date.now
	}
};

var investment = {
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
		default: 0
	},
	rate: {
		type: Number,
		default: 0
	},
	listing: {
		type: Schema.ObjectId,
		ref: 'Listing'
	}
}

var repayment = {
	date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
		default: 0
	},
	rate: {
		type: Number,
		default: 0
	},
	listing: {
		type: Schema.ObjectId,
		ref: 'Listing'
	}
}

var UserSchema = new Schema({
  name: {
		first: String,
		last: String,
	},
  email: {
    type: String,
    lowercase: true
  },
  username: {
		type: String,
		default: shortid.generate,
		unique : true,
		uniqueCaseInsensitive: true
	},
  phone: String,
	dob: Date,
	social: String,
	address: address,
	joined: {
		type: Date,
		default: Date.now
	},
	lastActive: Date,
  role: {
    type: String,
    default: 'borrower'
  },
	bankAccount: bankAccount,
	balance: {
		type: Number,
		default: 0
	},
	borrower: {
		status: {
			type: String,
			default: 'Inactive'
		},
		level: {
			type: String,
			default: 'Standard'
		},
		listings: [{
			type: Schema.ObjectId,
			ref: 'Listing'
		}]
	},
	investor: {
		increase: Boolean,
		status: {
			type: String,
			default: 'Inactive'
		},
		level: {
			type: String,
			default: 'Standard'
		},
		limit: {
			type: Number,
			default: 0
		},
		maximum: {
			type: Number,
			default: 0
		},
		offers: [{
			type: Schema.ObjectId,
			ref: 'Offer'
		}],
		investments: [investment],
		repayments: [repayment],
		notifications: Boolean,
		requests: String,
		notes: String
	},
  password: String,
  provider: String,
  salt: String,
  facebook: {},
  google: {},
  github: {},
	bookmarks: [bookmark],
	attachments: [file]
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name.first + ' ' + this.name.last,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(function(password) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return password.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOneAsync({ email: value })
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

	// Validate username is not taken
	UserSchema
	  .path('username')
	  .validate(function(value, respond) {
	    var self = this;
	    return this.constructor.findOneAsync({ username: value })
	      .then(function(user) {
	        if (user) {
	          if (self.id === user.id) {
	            return respond(true);
	          }
	          return respond(false);
	        }
	        return respond(true);
	      })
	      .catch(function(err) {
	        throw err;
	      });
	  }, 'The specified username address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
      next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          next(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      return null;
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                   .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

UserSchema.plugin(deepPopulate);
UserSchema.plugin(autopopulate);
export default mongoose.model('User', UserSchema);
