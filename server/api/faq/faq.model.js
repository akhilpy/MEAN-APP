'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String,
  order: Number
});

export default mongoose.model('Faq', FaqSchema);
