'use strict';

(function() {

  function OfferService($http, Auth, $q) {

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
        return $http.get('/api/offers/listing/' + listingID)
        .then(response => {
          var allOffers = {
            all: [],
            pending: [],
            live: [],
            rejected: [],
            outbid: [],
            accepted: [],
            complete: []
          };
          var promises = [];
          var offers = response.data;

          angular.forEach(offers, function(offer, key) {
            promises.push(allOffers['all'].push(offer));
            promises.push(allOffers[offer.status].push(offer));
          });

          return $q.all(promises).then(function() {
            return allOffers;
          });
        })
      },


      /**
       * Get an offer
       *
       * @return {String}
       */
      getOffer(offerID) {
        return $http.get('/api/offers/' + offerID);
      },


      /**
       * Get a listing's offers
       *
       * @return {String}
       */
      getAverageOffer(listingID) {
        return $http.get('/api/offers/listing/' + listingID).then(listing => {
          var offersArray = [];
          var promises = [];

          angular.forEach(listings, function(listing, key) {
            promises.push(
              Offers.getListingOffers(listing._id)
                .then(offers => {
                  offersArray.push(offers.data);
                })
            );
          });

          return $q.all(promises).then(function() {
            return offersArray;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
      },

      /**
       * Get a user's offers
       *
       * @return {String}
       */
      getUserOffers(userID) {
        if(userID) {
          return $http.get('/api/offers/user/' + userID);
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

      /**
       * Get a user's offers Async
       *
       * @return {String}
       */
      getUserOffersAsync(userID) {
        var deferred = $q.defer();

        Offers.getUserOffers(userID, function(res) {
          deferred.resolve(res);
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },

      /**
       * Update an Offer
       *
       * @return {String}
       */
      updateOffer(offer) {
        return $http.put('/api/offers/' + offer._id, offer);
      },

    };

    return Offers;
  }

  angular.module('investnextdoorCaApp')
    .factory('Offers', OfferService);

  })();
