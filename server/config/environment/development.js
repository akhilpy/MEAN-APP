'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/investnextdoorca-dev'
   // uri: 'mongodb://heroku_rzb2dg8l:s07stougkvena489h0fkbaa6qg@ds051635.mongolab.com:51635/heroku_rzb2dg8l'
  },

  // Seed database on startup
  seedDB: false

};
