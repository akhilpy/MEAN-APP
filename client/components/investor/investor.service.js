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
      var amount = 0;
      var total = 0;
      var interest = 0;
      var forecast = 0;
      var activeOffers = [];
      var offerPromises = [];
      var investmentPromises = [];

      return ListingService.getCurrentUser()
        .then(user => {

            return Offers.getUserOffers(user._id)
            .then(offers => {
              angular.forEach(offers, function(offer, key) {
                if(offer.status === 'live') {
                  amount += offer.amount;
                  activeOffers.push(offer);
                }

                offerPromises.push(offer);
              });

              return $q.all(offerPromises).then(() => {
                return user;
              });
            });

          }).then(user => {

            return Offers.getUserInvestments(user._id)
            .then(investments => {
              angular.forEach(investments, function(investment, key) {
                investmentPromises.push(investment);
                total += investment.amount;

                if(investment.status === 'complete') {
                  forecast += investment.cost;
                }

                if(investment.status === 'paid' || investment.status === 'closed') {
                  interest += investment.cost;
                }
              });

              return $q.all(investmentPromises).then(() => {
                return user;
              });
            });

          }).then(user => {

            return {
              balance: user.balance,
              amount: amount,
              number: activeOffers.length,
              total: total,
              interest: interest,
              forecast: forecast,
              late: 0,
              status: user.investor.status,
              level: user.investor.level
            };
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
