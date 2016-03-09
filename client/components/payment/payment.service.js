'use strict';

(function() {

  function PaymentService($location, $cookies, $http, User, Auth) {
    var currentUser = {};

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var transformRequest = function(obj) {
      var str = [];
      for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }

    var Payments = {

      /**
       * Add a user's bank account
       */
      addAccount(user) {
        return $http({
          method: 'POST',
          url: '/api/payments/add-account',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: user
        });
      },

      /**
       * Update a user's bank account
       */
      updateAccount(user) {
        return $http({
          method: 'POST',
          url: '/api/payments/update-account',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: user
        });
      },

      /**
       * Verify a user's bank account
       */
      verifyAccount(user) {
        return $http({
          method: 'POST',
          url: '/api/payments/verify-account',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: user
        });
      },

      /**
       * Create a transaction
       */
      createTransaction(transaction) {
        return $http({
          method: 'POST',
          url: '/api/payments/transaction',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: transaction
        });
      },

      /**
       * Get all logs
       */
      getLogs(type, filters) {
        if(filters) {
          return $http({
            method: 'POST',
            url: '/api/payments/logs/filtered',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: filters
          });
        } else {
          return $http({
            method: 'POST',
            url: '/api/payments/logs',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: type
          });
        }

      }

    };

    return Payments;
  }

  angular.module('investnextdoorCaApp')
    .factory('Payments', PaymentService);

  })();
