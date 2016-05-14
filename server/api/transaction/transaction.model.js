'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var autopopulate = require('mongoose-autopopulate');

var TransactionSchema = new mongoose.Schema({
  date: {
		type: Date,
		default: Date.now
	},
	amount: {
		type: Number,
		default: 0
	},
  balance: Number,
  user: {
    type: Schema.ObjectId,
		ref: 'User'
  },
  listing: {
    type: Schema.ObjectId,
    ref: 'Listing',
    autopopulate: true
  },
  kind: String,
  entry: {
    type: String,
    default: 'Debit'
  },
  reference: String,
  details: {
    amount_in_cents: {
      type: Number,
      default: 0
    },
    auto_withdraw: {
      type: Boolean,
      default: false
    },
    auto_withdrawl_token: Number,
    created_by_user: String,
    email: Number,
    from_account: String,
    link_url: Number,
    message: Number,
    process_on: Number,
    state: String,
    to_account: String,
    to_fund: String,
    token: String,
    transaction_reference: Number,
    transaction_type: String,
    payment_type: String,
    unique_reference: String
  }
});

TransactionSchema.plugin(autopopulate);
export default mongoose.model('Transaction', TransactionSchema);
