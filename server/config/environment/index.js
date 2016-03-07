'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'investnextdoor-ca-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  aws: {
    key: process.env.AWS_accessKeyId || '',
    secret: process.env.AWS_secretAccessKey || '',
    region: process.env.AWS_region || 'us-west-2',
    bucket: process.env.AWS_bucket || ''
  },

  yelp: {
    key: process.env.YELP_consumer_key || '',
    secret: process.env.YELP_consumer_secret || '',
    token: process.env.YELP_token || '',
    token_secret: process.env.YELP_token_secret || ''
  },

  payments: {
    client: {
      id: process.env.PAYMENT_ADMIN_CLIENT_ID || '',
      password: process.env.PAYMENT_ADMIN_CLIENT_PASS || ''
    },
    business: {
      id: process.env.PAYMENT_COLLECT_BUSINESS_FEE_CLIENT_ID || '',
      password: process.env.PAYMENT_COLLECT_BUSINESS_FEE_CLIENT_PASS || ''
    },
    addFunds: {
      id: process.env.PAYMENT_ADDFUNDSTOIND_CLIENT_ID || '',
      password: process.env.PAYMENT_ADDFUNDSTOIND_CLIENT_PASS || ''
    },
    withdrawFunds: {
      id: process.env.PAYMENT_WITHDRAW_FUNDS_FROM_IND_CLIENT_ID || '',
      password: process.env.PAYMENT_WITHDRAW_FUNDS_FROM_IND_CLIENT_PASS || ''
    },
    collectFunds: {
      id: process.env.PAYMENT_COLLECT_OFFER_FUNDS_CLIENT_ID || '',
      password: process.env.PAYMENT_COLLECT_OFFER_FUNDS_CLIENT_PASS || ''
    },
    sendFunds: {
      id: process.env.PAYMENT_SEND_LOAN_FUNDS_CLIENT_ID || '',
      password: process.env.PAYMENT_SEND_LOAN_FUNDS_CLIENT_PASS || ''
    },
    borrower: {
      id: process.env.PAYMENT_CHARGE_BORROWER_REPAYMENT_CLIENT_ID || '',
      password: process.env.PAYMENT_CHARGE_BORROWER_REPAYMENT_CLIENT_PASS || ''
    },
    user: process.env.PAYMENT_ADMIN_USER || '',
    password: process.env.PAYMENT_ADMIN_PASS || '',
    url: process.env.PAYMENT_BASE_URL || '',
    prefix: {
      token: process.env.PAYMENT_TOKEN_PREFIX || '',
      auth: process.env.PAYMENT_AUTH_PREFIX || '',
      log: process.env.PAYMENT_LOG_PREFIX || '',
      api: process.env.PAYMENT_API_PREFIX || ''
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
