'use strict';

(function() {

function AffiliateService($http) {

  var Affiliate = {

    /**
     * Get all Affiliate information
     *
     * @return {String}
     */
    getInfo() {
      return {};
    },

    /**
     * Get all Affiliate's Investors
     *
     * @return {String}
     */
    getInvestors(affiliate) {
      return $http.get('/api/users/affiliate/' + affiliate + '/investor')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },

    /**
     * Get all Affiliate's Offers
     *
     * @return {String}
     */
    getOffers(affiliate) {
      return $http.get('/api/offers/affiliate/' + affiliate + '/offers')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },

    /**
     * Get all Affiliate's Investments
     *
     * @return {String}
     */
    getInvestments(affiliate) {
      return $http.get('/api/listings/affiliate/' + affiliate + '/investments')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },

    /**
     * Get all Affiliate's Borrowers
     *
     * @return {String}
     */
    getBorrowers(affiliate) {
      return $http.get('/api/users/affiliate/' + affiliate + '/borrower')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },

    /**
     * Get all Affiliate's Listings
     *
     * @return {String}
     */
    getListings(affiliate) {
      return $http.get('/api/listings/affiliate/' + affiliate + '/listings')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },

    /**
     * Get all Affiliate's Loans
     *
     * @return {String}
     */
    getLoans(affiliate) {
      return $http.get('/api/offers/affiliate/' + affiliate + '/loans')
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    }

  };

  return Affiliate;
}

angular.module('investnextdoorCaApp')
  .factory('Affiliate', AffiliateService);

})();
