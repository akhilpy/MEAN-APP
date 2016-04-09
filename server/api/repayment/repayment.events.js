/**
 * Repayment model events
 */

'use strict';

import {EventEmitter} from 'events';
var Repayment = require('./repayment.model');
var RepaymentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RepaymentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Repayment.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RepaymentEvents.emit(event + ':' + doc._id, doc);
    RepaymentEvents.emit(event, doc);
  }
}

export default RepaymentEvents;
