'use strict';

(function() {

function InvestorService($location, $cookies, User) {
  var currentUser = {};

  if ($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Investor = {


    /**
     * Get account balance
     *
     * @return {String}
     */
    getBalance() {
      return '73845.75';
    },

    /**
     * Get monetary value of offers
     *
     * @return {String}
     */
    getOffersAmount() {
      return '24000';
    },

    /**
     * Get number of offers
     *
     * @return {String}
     */
    getOffersNumber() {
      return '4';
    },

    /**
     * Get investor status
     *
     * @return {String}
     */
    getInvestorStatus() {
      return 'Unconfirmed';
    },

    /**
     * Get total amount invested
     *
     * @return {String}
     */
    getTotalInvested() {
      return '60000';
    },

    /**
     * Get total interest earned
     *
     * @return {String}
     */
    getTotalInterest() {
      return '13845';
    },

    /**
     * Get forecast interest
     *
     * @return {String}
     */
    getForecastInterest() {
      return '15560';
    },

    /**
     * Get late payments
     *
     * @return {String}
     */
    getLatePayments() {
      return '0';
    },

    /**
     * Get late payments
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
    }

  };

  return Investor;
}

angular.module('investnextdoorCaApp')
  .factory('Investor', InvestorService);

})();
