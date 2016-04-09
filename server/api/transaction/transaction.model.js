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
  user: {
    type: Schema.ObjectId,
		ref: 'User'
  },
  listing: {
    type: Schema.ObjectId,
    ref: 'Listing',
    autopopulate: true
  },
  entry: {
    type: String,
    default: 'Debit'
  },
  reference: String
});

TransactionSchema.plugin(autopopulate);
export default mongoose.model('Transaction', TransactionSchema);
