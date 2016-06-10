'use strict';

(function() {

  function OfferService($http, Auth, $q, $filter, Transactions, ListingService, Emails) {

    var Offers = {

      /**
       * Make a new offer
       */
      new(offer, listing) {
        var promises = [];
        var hasCurrentOffer = false;
        offer.term = listing.details.term;

        return ListingService.getCurrentUser()
          .then(user => {

            // check if the offer is in the accepted range
            if(offer.amount > user.investor.maximum) {
              return false;
            }

            // check if investor has already made an offer on this listing
            // if they have, replace the old offer with the new offer
            // return the funds from the original offer to the investor
            return Offers.getUserOffers(user._id)
            .then(offers => {
              angular.forEach(offers, function(currentOffer, key) {
                if(currentOffer.listing && currentOffer.listing._id === listing._id && currentOffer.user._id === user._id) {
                  if(currentOffer.status === 'live' || currentOffer.status === 'pending') {
                    hasCurrentOffer = true;

                    var credit = {
                      amount: currentOffer.amount,
                      listing: listing._id,
                      entry: 'Credit',
                      kind: 'Offer',
                      description: 'Refunded Offer on Listing ' + listing.general.businessName
                    };
                    promises.push(Transactions.create(user, credit));

                    var debit = {
                      amount: offer.amount,
                      listing: listing._id,
                      entry: 'Debit',
                      kind: 'Offer',
                      description: 'Made Offer on Listing ' + listing.general.businessName
                    };
                    promises.push(Transactions.create(user, debit));

                    currentOffer.amount = offer.amount;
                    currentOffer.rate = offer.rate;
                    currentOffer.term = offer.term;
                    currentOffer.date = new Date().toISOString();
                    Offers.updateOffer(currentOffer)
                    promises.push(currentOffer);
                  }
                }
              });

              // take the funds for the offer from the investor for the offer
              // happens in the controller
              return $q.all(promises).then(() => {
                if(!hasCurrentOffer) {
                  var debit = {
                    amount: offer.amount,
                    listing: listing._id,
                    entry: 'Debit',
                    kind: 'Offer',
                    description: 'Made Offer on Listing ' + listing.general.businessName
                  };

                  Transactions.create(user, debit)
                  .then(user => {
                    var investorEmail = {
                      firstname: user.name.first,
                      email: user.email,
                      business: {
                        name: listing.general.businessName,
                        id: listing._id
                      }
                    }
                    Emails.offerPending(investorEmail);

                    ListingService.getUserOne(listing._id)
                    .then(user => {
                      var borrowerEmail = {
                        firstname: user.name.first,
                        email: user.email,
                        amount: offer.amount,
                        rate: offer.rate,
                        username: offer.user.username
                      }
                      Emails.listingNewOffer(borrowerEmail);
                    });

                    return $http.post('/api/offers', {
                      user: user,
                      offer: offer
                    });
                  });
                }

                // find the previous lowest offer and set it to outbid
                Offers.lowestOffers(listing);

                return true;
              });
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
        var promises = [];
        var offers = [];

        if(status) {
          return $http.get('/api/offers/status/' + status)
          .then(response => {
            if(response.data) {
              return response.data;
            } else {
              return [];
            }
          });
        } else {
          return $http.get('/api/offers')
          .then(response => {
            angular.forEach(response.data, function(offer, key) {
              if(offer.status === 'pending' || offer.status === 'live' || offer.status === 'rejected' || offer.status === 'outbid') {
                promises.push(offers.push(offer));
              }
            });

            return $q.all(promises).then(function() {
              return offers;
            });
          });
        }
      },



      /**
       * Get all loans
       *
       * @return {String}
       */
      getLoans(status) {
        var promises = [];
        var loans = [];

        if(status) {
          return $http.get('/api/offers/status/' + status)
          .then(response => {
            if(response.data) {
              return response.data;
            } else {
              return [];
            }
          });
        } else {
          return $http.get('/api/offers')
          .then(response => {
            angular.forEach(response.data, function(loan, key) {
              if(loan.status === 'accepted' || loan.status === 'repayment' || loan.status === 'complete') {
                promises.push(loans.push(loan));
              }
            });

            return $q.all(promises).then(function() {
              return loans;
            });
          });
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
            complete: [],
            unpaid: [],
            closed: []
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
       * Get Lowest Offers from a Listing
       *
       * @return {String}
       */
      lowestOffers(listing) {
        var lowestOffers = [];
        var promises = [];
        var goal = listing.details.amount;
        var total = 0;

        return Offers.getListingOffers(listing._id)
          .then(offers => {

            var sortedOffers = $filter('orderBy')(offers.all, ['rate', 'date']);

            angular.forEach(sortedOffers, function(offer, key) {
              total += total + offer.amount;

              if(offer.status === 'pending' || offer.status === 'live') {
                if(total > goal) {
                  promises.push(lowestOffers.push(offer));

                  ListingService.getUserOne(offer.listing._id)
                  .then(user => {
                    var email = {
                      firstname: user.name.first,
                      email: user.email,
                      business: {
                        name: offer.listing.general.businessName,
                        id: offer.listing._id
                      },
                      amount: offer.listing.details.amount,
                      deadline: offer.listing.admin.basics.deadline
                    }
                    Emails.listingFundingPending(email);
                  });
                }
              }

            });

            angular.forEach(lowestOffers, function(offer, key) {
              offer.status = 'outbid';

              var credit = {
                amount: offer.amount,
                listing: listing._id,
                entry: 'Credit',
                kind: 'Offer',
                description: 'Refunded Offer on Listing ' + listing.general.businessName
              };

              var email = {
                firstname: offer.user.name.first,
                email: offer.user.email,
                business: {
                  name: offer.listing.general.businessName,
                  id: offer.listing._id
                }
              }
              Emails.offerOutbid(email);

              promises.push(Transactions.create(offer.user, credit));
              promises.push(Offers.updateOffer(offer));
            });

            return $q.all(promises).then(function() {
              return lowestOffers;
            });

          });
      },



      /**
       * Get a user's offers
       *
       * @return {String}
       */
      getUserOffers(userID) {
        var offers = [];
        var promises = [];

        if(userID) {
          return $http.get('/api/offers/user/' + userID)
          .then(response => {
            if(response.data) {
              angular.forEach(response.data, function(offer, key) {
                if(offer.status === 'pending' || offer.status === 'live' || offer.status === 'rejected' || offer.status === 'accepted') {
                  promises.push(offers.push(offer));
                }
              });
            }

            return $q.all(promises).then(() => {
              return offers;
            })
          });
        } else {
          return Auth.getCurrentUser(null)
            .then(user => {
              return $http.get('/api/offers/user/' + user._id)
              .then(response => {
                if(response.data) {
                  angular.forEach(response.data, function(offer, key) {
                    if(offer.status === 'pending' || offer.status === 'live' || offer.status === 'rejected' || offer.status === 'accepted') {
                      promises.push(offers.push(offer));
                    }
                  });
                }

                return $q.all(promises).then(() => {
                  return offers;
                })
              });
            })
            .catch(err => {
              console.log(err.message);
            });
        }
      },


      /**
       * Get a user's investments
       *
       * @return {String}
       */
      getUserInvestments(userID) {
        var investments = [];
        var promises = [];

        if(userID) {
          return $http.get('/api/offers/user/' + userID)
          .then(response => {
            if(response.data) {
              angular.forEach(response.data, function(investment, key) {
                if(investment.status === 'complete' || investment.status === 'unpaid' || investment.status === 'closed') {
                  promises.push(investments.push(investment));
                }
              });
            }

            return $q.all(promises).then(() => {
              return investments;
            })
          });
        } else {
          return Auth.getCurrentUser(null)
            .then(user => {
              return $http.get('/api/offers/user/' + user._id)
              .then(response => {
                if(response.data) {
                  angular.forEach(response.data, function(investment, key) {
                    if(investment.status === 'complete' || investment.status === 'unpaid' || investment.status === 'closed') {
                      promises.push(investments.push(investment));
                    }
                  });
                }

                return $q.all(promises).then(() => {
                  return investments;
                })
              });
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
        if(offer.status === 'approved') {
          var email = {
            firstname: offer.user.name.first,
            email: offer.user.email,
            business: {
              name: offer.listing.general.businessName,
              id: offer.listing._id
            },
            amount: offer.amount,
            rate: offer.rate
          }
          Emails.offerApproved(email);
        }

        return $http.put('/api/offers/' + offer._id, offer);
      },

    };

    return Offers;
  }

  angular.module('investnextdoorCaApp')
    .factory('Offers', OfferService);

  })();
