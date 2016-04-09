'use strict';

(function() {

  function PaymentService($location, $cookies, $http, User, Auth, ListingService) {
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
      addAccount(account) {
        return ListingService.getCurrentUser()
          .then(user => {
            account.username = user._id;
            account.password = user._id;
            account.email = user.email;
            return $http({
              method: 'POST',
              url: '/api/payments/add-account',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: transformRequest,
              data: account
            })
            .catch(err => {
              return err;
            })
          })
          .catch(err => {
            console.log(err);
          });
      },

      /**
       * Update a user's bank account
       */
      updateAccount(account) {
        return ListingService.getCurrentUser()
          .then(user => {
            account.username = user._id;
            account.password = user._id;
            account.email = user.email;
            return $http({
              method: 'POST',
              url: '/api/payments/update-account',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: transformRequest,
              data: account
            })
            .catch(err => {
              return err;
            })
          })
          .catch(err => {
            console.log(err);
          });
      },

      /**
       * Verify a user's bank account
       */
      verifyAccount() {
        return ListingService.getCurrentUser()
          .then(user => {
            console.log(user._id);
            var data = {
              email: user.email,
              user_id: user._id,
              first_name: user.name.first,
              last_name: user.name.last
            };

            return $http({
              method: 'POST',
              url: '/api/payments/verify-account',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: transformRequest,
              data: data
            })
            .catch(err => {
              return err;
            });
          })
          .catch(err => {
            console.log(err);
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
