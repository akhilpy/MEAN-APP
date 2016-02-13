/**
 * Listing model events
 */

'use strict';

import {EventEmitter} from 'events';
var Listing = require('./listing.model');
var ListingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ListingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Listing.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ListingEvents.emit(event + ':' + doc._id, doc);
    ListingEvents.emit(event, doc);
  }
}

export default ListingEvents;
