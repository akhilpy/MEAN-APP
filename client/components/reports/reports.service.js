'use strict';

(function() {

function ReportService($http, Offers, ListingService, $q) {

  var Report = {

    listings() {
      return $http.get('/api/reports/listings')
      .then(response => {
        return response.data;
      });
    },

    users() {
      return $http.get('/api/reports/users')
      .then(response => {
        return response.data;
      });
    }

  };

  return Report;
}

angular.module('investnextdoorCaApp')
  .factory('Report', ReportService);

})();
