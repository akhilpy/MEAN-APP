'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import {Schema} from 'mongoose';

var autopopulate = require('mongoose-autopopulate');

var OfferSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  listing: {
    type: Schema.ObjectId,
    ref: 'Listing',
    autopopulate: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  rate: {
    type: Number,
    default: 0
  },
  term: {
    type: Number,
    default: 6
  },
  amount: {
    type: Number,
    default: 0
  },
  effectiveRate: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  cost: {
    type: Number,
    default: 0
  },
  fees: {
    type: Number,
    default: 0
  },
  totalPayment: {
    type: Number,
    default: 0
  },
  return: {
    type: Number,
    default: 0
  },
  monthly: {
    principal: {
      type: Number,
      default: 0
    },
    interest: {
      type: Number,
      default: 0
    },
    fees: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    default: 'pending'
  },
  transaction: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
});

/**
 * Methods
 */
OfferSchema.methods = {

  /**
   * Calculate Payment
   *
   * @return {String}
   */
  calculatePayment(amount, rate, term) {
    var rate = rate / 100;

    this.effectiveRate = +(Math.pow((1 + (rate / 12)), term)).toFixed(6);
    this.monthlyPayment = +((amount * (rate / 12) * this.effectiveRate) / (this.effectiveRate - 1)).toFixed(4);
    this.total = +(this.monthlyPayment * term).toFixed(2);
    this.cost = +(this.total - amount).toFixed(2);
    this.fees = +((this.total * 0.04) + 700).toFixed(2);
    this.totalPayment = +(this.cost + this.fees).toFixed(2);
    this.return = +(this.cost - (this.total * 0.01)).toFixed(2);
    this.monthly = {
      principal: +(amount / term).toFixed(2),
      interest: +(this.cost / term).toFixed(2),
      fees: +((this.total * 0.04) / term).toFixed(2),
      total: this.monthlyPayment
    };
  }

}

OfferSchema.pre('save', function(next) {
  var repayment = new this.calculatePayment(this.amount, this.rate, this.term);
  this.effectiveRate = repayment.effectiveRate;
  this.total = repayment.total;
  this.cost = repayment.cost;
  this.fees = repayment.fees;
  this.monthly = repayment.monthly;
  this.totalPayment = repayment.totalPayment;
  this.return = repayment.return;
  next();
});

OfferSchema.plugin(autopopulate);
export default mongoose.model('Offer', OfferSchema);
