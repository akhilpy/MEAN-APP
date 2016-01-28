/**
 * Faq model events
 */

'use strict';

import {EventEmitter} from 'events';
var Faq = require('./faq.model');
var FaqEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FaqEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Faq.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FaqEvents.emit(event + ':' + doc._id, doc);
    FaqEvents.emit(event, doc);
  }
}

export default FaqEvents;
