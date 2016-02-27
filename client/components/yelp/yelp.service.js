'use strict';

(function() {

  function YelpService($http) {

    var Yelp = {

      /**
       * Get business from Yelp
       *
       * @return {String}
       */
      getBusiness(ID) {
        return $http.get('/api/yelp/' + ID);
      },

      /**
       * Get business reviews from Yelp
       *
       * @return {String}
       */
      getReviews(ID) {
        return $http.get('/api/yelp/' + ID);
      }

    };

    return Yelp;
  }

  angular.module('investnextdoorCaApp')
    .factory('YelpService', YelpService);

})();
