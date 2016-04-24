'use strict';

(function() {

function InvestorService($http, Offers, ListingService, $q) {

  var Investor = {

    /**
     * Get all Investor information
     *
     * @return {String}
     */
    getInvestorInfo() {
      var info = {};
      var total = 0;
      var activeOffers = [];
      return ListingService.getCurrentUser()
        .then(user => {
          return Offers.getUserOffers(user._id).then(offers => {
            angular.forEach(offers, function(offer, key) {
              if(offer.status === 'live') {
                activeOffers.push(offer);
                total += offer.amount;
              }
            });
            return user;
          }).then(user => {
            return {
              balance: user.balance,
              amount: total,
              number: activeOffers.length,
              total: 0,
              interest: 13845,
              forecast: 15560,
              late: 0,
              status: user.investor.status,
              level: user.investor.level
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
     * Get Repayments
     *
     * @return {String}
     */
    getRepayments() {
      var userID;
      return ListingService.getCurrentUser()
        .then(user => {
          userID = user._id;
          return $http.get('/api/repayments/investor/' + user._id);
        })
        .then(response => {
          var promises = [];
          var repayments = [];

          if(response.data && response.data[0]) {
            var investors = response.data[0].investors;
            var borrower = response.data[0].borrower.user;
            var listing = response.data[0].listing;

            angular.forEach(investors, function(investor) {
              if(investor.user._id === userID) {
                investor.borrower = borrower;
                investor.listing = listing;
                promises.push(repayments.push(investor));
              }
            });
          }

          return $q.all(promises).then(function() {
            return repayments;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    /**
     * Get bookmarks
     *
     * @return {String}
     */
    getBookmarks() {
      return ListingService.getCurrentUser()
        .then(user => {
          return $http.get('/api/users/' + user._id + '/bookmarks');
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  };

  return Investor;
}

angular.module('investnextdoorCaApp')
  .factory('Investor', InvestorService);

})();
