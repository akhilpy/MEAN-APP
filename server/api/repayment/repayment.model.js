'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var autopopulate = require('mongoose-autopopulate');

var payment = {
  date: {
    type: Date
  },
  amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Pending'
  }
}

var investor = {
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  payments: [payment]
}

var RepaymentSchema = new mongoose.Schema({
  created: {
		type: Date,
    default: Date.now
	},
  borrower: {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    payments: [payment]
  },
  investors: [investor],
  listing: {
    type: Schema.ObjectId,
    ref: 'Listing',
    autopopulate: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  notes: {
    type: String,
    default: ''
  }
});

/**
 * Virtuals
 */

// Payment Balances
RepaymentSchema
  .virtual('borrower.balances')
  .get(function() {
    var payments = this.borrower.payments;
    var total = 0;
    var paid = 0;
    var unpaid = 0;

    payments.forEach(function(payment) {
      total += payment.amount;

      if(payment.status === 'Pending') {
        unpaid += payment.amount;
      }

      if(payment.status === 'Complete') {
        paid += payment.amount;
      }
    })

    return {
      'total': total,
      'unpaid': unpaid,
      'paid': paid
    };
  });

RepaymentSchema.set('toJSON', { virtuals: true });

RepaymentSchema.plugin(autopopulate);
export default mongoose.model('Repayment', RepaymentSchema);
