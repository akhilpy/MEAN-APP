'use strict';

(function() {

  function EmailService($http) {

    var Emails = {

      /**
       * Send a new email
       */
      new(email) {
        return $http.post('/api/mails', email)
        .then(response => {
          if(response.statusText === "Created") {
            return true;
          } else {
            return false;
          }
        })
        .catch(err => {
          return false;
        })
      }

    }

    return Emails;

  }

angular.module('investnextdoorCaApp')
  .factory('Emails', EmailService);

})();
