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
  amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'pending'
  },
  transaction: {
    type: String,
    default: ''
  }
});

OfferSchema.plugin(autopopulate);
export default mongoose.model('Offer', OfferSchema);
