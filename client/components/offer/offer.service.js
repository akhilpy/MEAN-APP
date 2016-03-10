'use strict';

(function() {

  function OfferService($http, Auth) {

    var Offers = {

      /**
       * Make a new offer
       */
      new(offer) {
        return Auth.getCurrentUser(null)
          .then(user => {
            return $http.post('/api/offers', {
              user: user,
              offer: offer
            });
          })
          .catch(err => {
            console.log(err.message);
          });
      },


      /**
       * Get all offers
       *
       * @return {String}
       */
      getAll(status) {
        if(status) {
          return $http.get('/api/offers/status/' + status);
        } else {
          return $http.get('/api/offers');
        }
      },


      /**
       * Get a listing's offers
       *
       * @return {String}
       */
      getListingOffers(listingID) {
        return $http.get('/api/offers/listing/' + listingID);
      },

      /**
       * Get a user's offers
       *
       * @return {String}
       */
      getUserOffers(userID) {
        if(userID) {
          return $http.get('/api/offers/user/' + user);
        } else {
          return Auth.getCurrentUser(null)
            .then(user => {
              return $http.get('/api/offers/user/' + user._id);
            })
            .catch(err => {
              console.log(err.message);
            });
        }
      },

    };

    return Offers;
  }

  angular.module('investnextdoorCaApp')
    .factory('Offers', OfferService);

  })();
