'use strict';

(function() {

function InvestorService($http, Offers, ListingService) {

  var Investor = {

    /**
     * Get all Investor information
     *
     * @return {String}
     */
    getInvestorInfo() {
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
