'use strict';

(function() {

  function TransactionService($http, Auth, $q, $filter, ListingService) {

    var Transactions = {

      /**
       * Create a Transaction
       *
       * @return {String}
       */
      create(user, transaction) {
        if(transaction.entry === 'Debit') {
          transaction.balance = user.balance - transaction.amount;
        } else {
          transaction.balance = user.balance + transaction.amount;
        }

        user.balance = transaction.balance;

        return $http.put('/api/users/' + user._id, {
          user: user
        })
        .then(response => {
          transaction.user = response.data[0];
          return $http.post('/api/transactions', transaction)
          .then(response => {
            return transaction.user;
          });
        });
      },

      /**
       * Get a Transaction
       *
       * @return {String}
       */
      getOne(transactionID) {
        return $http.get('/api/transactions/' + transactionID);
      },

      /**
       * Get a user's Transactions
       *
       * @return {String}
       */
      getUsers(userID) {
        return $http.get('/api/transactions/user/' + userID);
      },

      /**
       * Get all Transactions
       *
       * @return {String}
       */
      get(kind) {
        if(kind) {
          return $http.get('/api/transactions/' + kind);
        } else {
          return $http.get('/api/transactions/');
        }
      }

    };

    return Transactions;
  }

angular.module('investnextdoorCaApp')
  .factory('Transactions', TransactionService);

})();
