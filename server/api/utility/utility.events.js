/**
 * Utility model events
 */

'use strict';

import {EventEmitter} from 'events';
var Utility = require('./utility.model');
var UtilityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UtilityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Utility.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UtilityEvents.emit(event + ':' + doc._id, doc);
    UtilityEvents.emit(event, doc);
  }
}

export default UtilityEvents;
