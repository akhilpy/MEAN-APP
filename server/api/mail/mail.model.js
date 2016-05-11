'use strict';

import mongoose from 'mongoose';

var MailSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  from: String,
  to: String,
  cc: String,
  subject: String,
  html: String
});

export default mongoose.model('Mail', MailSchema);
