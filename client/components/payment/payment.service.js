'use strict';

(function() {

  function PaymentService($location, $cookies, $http, User, Auth, ListingService, $q) {
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
            .then(response => {
              user.bankAccount.institution_number = account.institution_number;
              user.bankAccount.branch_number = account.branch_number;
              user.bankAccount.account_number = account.account_number;
              user.bankAccount.verified = false;
              return $http.put('/api/users/' + user._id, {
                user: user
              });
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
            .then(response => {
              user.bankAccount.institution_number = account.institution_number;
              user.bankAccount.branch_number = account.branch_number;
              user.bankAccount.account_number = account.account_number;
              user.bankAccount.verified = false;
              return $http.put('/api/users/' + user._id, {
                user: user
              }).
              then(response => {
                return response;
              });
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
            .then(response => {
              var promises = [];

              if(response.data.status === 'success' && response.data.message.length === 3) {
                user.bankAccount.verification = [];

                angular.forEach(response.data.message, function(message, key) {
                  if(message.transaction_type === 'direct_debit') {
                    user.bankAccount.verification.push(message.amount_in_cents);
                  }
                  var transaction = {
                    user: user,
                    details: message
                  };
                  promises.push(message);
                  $http.post('/api/transactions', transaction)
                  .then(response => {
                    console.log(response);
                  })
                  .catch(err => {
                    console.log(err);
                  })
                });

                return $q.all(promises)
                .then(() => {
                  return response;
                });
              }
            })
            .then(() => {
              return $http.put('/api/users/' + user._id, {
                user: user
              });
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
      confirmAccount(valA, valB) {
        var confirm = false;

        return ListingService.getCurrentUser()
        .then(user => {
          if(user.bankAccount.verification.length > 0) {
            if(valA === user.bankAccount.verification[0] || valB === user.bankAccount.verification[0]) {
              confirm = true;
            } else {
              confirm = false;
            }

            if(valA === user.bankAccount.verification[1] || valB === user.bankAccount.verification[1]) {
              confirm = true;
            } else {
              confirm = false;
            }
          }

          if(confirm) {
            user.bankAccount.verified = true;
            return $http.put('/api/users/' + user._id, {
              user: user
            })
            .then(response => {
              if(response.status === 200) {
                return true;
              } else {
                return false;
              }
            })
            .catch(err => {
              console.log(err);
            });
          }
        })
      },


      /**
       * Add Funds
       */
      addFunds(amount, user) {
        var transaction = {
          code: 'AFI',
          transaction_type: 'direct_debit',
          institution_number: user.bankAccount.institution_number,
          branch_number: user.bankAccount.branch_number,
          account_number: user.bankAccount.account_number,
          amount_in_cents: amount
        };

        return $http({
          method: 'POST',
          url: '/api/payments/transaction',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: transaction
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
        var logs;
        if(type === 'error') {
          logs = 'ELG';
        } else if (type === 'webhooks') {
          logs = 'WLG';
        } else {
          logs = 'SLG';
        }

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
            data: {method: logs}
          });
        }

      }

    };

    return Payments;
  }

  angular.module('investnextdoorCaApp')
    .factory('Payments', PaymentService);

  })();
