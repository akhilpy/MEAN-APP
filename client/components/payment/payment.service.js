'use strict';

(function() {

  function PaymentService($location, $cookies, $http, User, Auth, ListingService, $q, $timeout, Emails) {
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
            if(!user.bankAccount.verified) {
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
                })
                .then(user => {
                  var email = {
                    firstname: user.name.first,
                    email: user.email
                  };
                  return Emails.bankValidation(email)
                  .then(() => {
                    return user;
                  })
                })
              })
              .catch(err => {
                console.log(err);
                return err;
              })
            } else {
              return;
            }
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
                    entry: 'Private',
                    kind: 'Verification',
                    amount: message.amount_in_cents,
                    balance: null,
                    details: response.data.message,
                    description: 'Verify Account'
                  };
                  promises.push(message);
                  $http.post('/api/transactions', transaction)
                  .then(response => {
                    console.log(response);
                    return response;
                  })
                  .catch(err => {
                    console.log(err);
                    return err;
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
       * Create a transaction reference
       */
      createReference() {
        var timeStamp = Math.floor(Date.now());

        function _p8(s) {
          var p = (Math.random().toString(16)+"000000000").substr(2,8);
          return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }

        return _p8() + _p8(true) + _p8(true) + timeStamp;
      },


      /**
       * Create a transaction
       */
      createTransaction(sentTransaction) {
        var entry, description;
        var user = sentTransaction.user;
        var kind = sentTransaction.kind;

        var transaction = {
          user_id: user._id,
          username: user._id,
          password: user._id,
          email: user.email,
          first_name: user.name.first,
          last_name: user.name.last,
          method: sentTransaction.method,
          amount_in_cents: (sentTransaction.amount*100),
          full_amount_in_cents: (sentTransaction.amount*100),
          transaction_type: sentTransaction.type,
          institution_number: user.bankAccount.institution_number,
          branch_number: user.bankAccount.branch_number,
          account_number: user.bankAccount.account_number,
          transaction_reference: Payments.createReference()
        };

        if(sentTransaction.discountFlat) {
          transaction.discount_flat_in_cents = sentTransaction.discountFlat;
        }

        if(sentTransaction.discountPercentage) {
          transaction.discount_percentage = sentTransaction.discountPercentage;
        }

        if(transaction.method === 'AFI') {
          entry = 'Credit';
          description = 'Adding Funds to InvestNextDoor';
        } else if(transaction.method === 'WFI') {
          if(user.balance < (transaction.amount_in_cents / 100)) {
            return $timeout(function() {
              return false;
            }, 500);
          }
          entry = 'Debit';
          description = 'Withdrawing Funds from InvestNextDoor';
        } else if(transaction.method === 'CBF') {
          entry = 'Debit';
          description = 'Collecting Application Fee';
        } else {
          entry = 'Private';
          description = 'Verifying Bank Account with InvestNextDoor';
        }

        return $http({
          method: 'POST',
          url: '/api/payments/transaction',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: transformRequest,
          data: transaction
        })
        .then(response => {
          var amount = (transaction.amount_in_cents / 100);
          var balance;

          if(entry === 'Debit') {
            if(transaction.method !== 'CBF') {
              balance = user.balance - (amount - (transaction.discount_flat_in_cents / 100));
            }
          } else if(entry === 'Credit') {
            balance = user.balance + amount;
          } else {
            balance = user.balance;
          }

          transaction = {
            user: user,
            entry: entry,
            kind: kind,
            amount: amount,
            balance: balance,
            details: response.data.message,
            description: description
          };

          return $http.post('/api/transactions', transaction)
          .then(result => {
            return result.data;
          })
          .then(result => {
            return response.data;
          })
          .catch(err => {
            return err;
          });
        })
        .catch(err => {
          return err;
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
          if(!filters.status) {
            filters.status = 'success';
          }

          return $http({
            method: 'POST',
            url: '/api/payments/logs/filtered',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: filters
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            return [];
          });
        } else {
          return $http({
            method: 'POST',
            url: '/api/payments/logs',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: transformRequest,
            data: {method: logs}
          })
          .then(response => {
            return response.data;
          })
          .catch(err => {
            return [];
          });
        }

      }

    };

    return Payments;
  }

  angular.module('investnextdoorCaApp')
    .factory('Payments', PaymentService);

  })();
