'use strict';

(function() {

function BorrowerService($http, Offers, $q, ListingService) {

  var Borrower = {

    /**
     * Get all Borrower information
     *
     * @return {String}
     */
    getBorrowerInfo() {
      var info = {};
      return ListingService.getCurrentUser()
        .then(user => {
          return Offers.getUserOffers(user._id).then(data => {
            var offers = data.data;
            var total = 0;
            angular.forEach(offers, function(offer, key) {
              total += offer.amount;
            });
            return total;
          }).then(total => {
            return {
              balance: user.investor.balance,
              amount: total,
              number: user.investor.offers.length,
              total: 0,
              interest: 13845,
              forecast: 15560,
              late: 0,
              status: user.investor.status
            }
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    /**
     * Get statements
     *
     * @return {String}
     */
    getStatements() {
      var statements = [
        {
          date: '11/05/15',
          type: 'Payment',
          description: 'Transaction Description',
          credit: '500',
          debit: '',
          balance: '73845.75'
        },
        {
          date: '11/01/15',
          type: 'Payment',
          description: 'Transaction Description',
          credit: '1050',
          debit: '',
          balance: '73345.75'
        },
        {
          date: '10/28/15',
          type: 'Offer',
          description: 'Transaction Description',
          credit: '',
          debit: '10000',
          balance: '72295.75'
        },
        {
          date: '10/05/15',
          type: 'Payment',
          description: 'Transaction Description',
          credit: '500',
          debit: '',
          balance: '82295.755'
        },
        {
          date: '10/01/15',
          type: 'Payment',
          description: 'Transaction Description',
          credit: '1050',
          debit: '',
          balance: '81795.95'
        }
      ];
      return statements;
    },

    /**
     * Get Actions
     *
     * @return {String}
     */
    getActions() {
      return [
        {
          task: 'Verify Bank',
          description: 'We need you to confirm that you are the owner of your bank account before we can process your application. You will receive two small deposits in your account within two days. When you see these deposits, return here to verify your account.',
          button: 'Confirm',
          state: 'dashboard.borrower.actions.account',
          status: 'incomplete'
        }
      ]
    },

    /**
     * Get Applications
     *
     * @return {String}
     */
    getApplications() {
      return ListingService.getCurrentUser()
        .then(user => {
          return user.borrower.listings;
        }).then(listings => {
          var listingsArray = [];
          var promises = [];

          angular.forEach(listings, function(listing, key) {
            promises.push(
              ListingService.getOne(listing)
                .then(listing => {
                  listingsArray.push(listing.data);
                })
            );
          });

          return $q.all(promises).then(function() {
            return listingsArray;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    /**
     * Get Offers
     *
     * @return {String}
     */
    getOffers() {
      return Borrower.getApplications()
        .then(listings => {
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
     * Get Requests
     *
     * @return {String}
     */
    getRequests() {
      return Borrower.getApplications()
        .then(applications => {
          var requestsArray = [];
          var promises = [];

          angular.forEach(applications, function(application, key) {
            var requests = application.infoRequest;
            requests.name = application.general.businessName;
            promises.push( requestsArray.push(requests) );
          });

          return $q.all(promises).then(function() {
            return requestsArray;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  };

  return Borrower;
}

angular.module('investnextdoorCaApp')
  .factory('Borrower', BorrowerService);

})();
