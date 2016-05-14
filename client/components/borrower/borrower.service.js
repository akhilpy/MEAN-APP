'use strict';

(function() {

function BorrowerService($http, Offers, $q, ListingService) {

  var Borrower = {

    info: {},

    /**
     * Get all Borrower information
     *
     * @return {String}
     */
    getInfo() {
      var info = ListingService.getCurrentUser()
        .then(user => {
          if(user.borrower.listings.length > 0) {
            var listing = user.borrower.listings[0];
            return Offers.getListingOffers(listing).then(data => {
              var offers = {
                all: data.data,
                active: [],
                total: 0
              };
              angular.forEach(offers.all, function(offer, key) {
                if(offer.status === 'pending') {
                  offers.total += offer.amount;
                  offers.active.push(offer);
                }

              });
              return offers;
            }).then(offers => {
              return {
                balance: user.borrower.balance,
                amount: offers.total,
                number: offers.active.length,
                status: user.bankAccount.verified
              }
            })
            .catch(err => {
              console.log(err.message);
            });
          } else {
            return {
              balance: user.borrower.balance,
              amount: 0,
              number: 0,
              status: user.bankAccount.verified
            };
          }
        });

      return $q.when(info)
      .then(function(data) {
        angular.copy(data, Borrower.info);
      });
    },

    statements: [],

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

      return $q.when(statements)
      .then(function(data) {
        angular.copy(data, Borrower.statements);
      });
    },

    /**
     * Get Actions
     *
     * @return {String}
     */
    getActions(user) {
      var userStatus;
      var bankStatus = 'incomplete';

      if(user) {
        userStatus = user.borrower.status;
        if( userStatus === 'Active' ) {
          bankStatus = 'complete';
        }

        return [
          {
            task: 'Verify Bank',
            description: 'We need you to confirm that you are the owner of your bank account before we can process your application. You will receive two small deposits in your account within two days. When you see these deposits, return here to verify your account.',
            buttons: {
              complete: 'Done',
              incomplete: 'Confirm'
            },
            state: 'dashboard.borrower.actions.account',
            status: bankStatus
          }
        ]

      } else {

        return ListingService.getCurrentUser()
        .then(user => {
          userStatus = user.borrower.status;
          bankStatus = 'incomplete';
          if( userStatus === 'Active' ) {
            bankStatus = 'complete';
          }

          return [
            {
              task: 'Verify Bank',
              description: 'We need you to confirm that you are the owner of your bank account before we can process your application. You will receive two small deposits in your account within two days. When you see these deposits, return here to verify your account.',
              buttons: {
                complete: 'Done',
                incomplete: 'Confirm'
              },
              state: 'dashboard.borrower.actions.account',
              status: bankStatus
            }
          ]
        });
      }

    },

    /**
     * Get Applications
     *
     * @return {String}
     */
    getApplications() {
      return ListingService.getCurrentUser()
        .then(user => {
          return user.borrower.listings;
        }).then(listings => {
          var listingsArray = [];
          var promises = [];

          angular.forEach(listings, function(listing, key) {
            promises.push(
              ListingService.getOne(listing)
                .then(listing => {
                  listingsArray.push(listing.data);
                })
            );
          });

          return $q.all(promises).then(function() {
            return listingsArray;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    /**
     * Get Offers
     *
     * @return {String}
     */
    getOffers() {
      return Borrower.getApplications()
        .then(listings => {
          var allOffers = {};
          var promises = [];

          angular.forEach(listings, function(listing, key) {
            promises.push(
              Offers.getListingOffers(listing._id)
                .then(offers => {
                  allOffers = offers;
                })
            );
          });

          return $q.all(promises).then(function() {
            return allOffers;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    /**
     * Get Requests
     *
     * @return {String}
     */
    getRequests() {
      return Borrower.getApplications()
        .then(applications => {
          var requestsArray = [];
          var promises = [];

          angular.forEach(applications, function(application, key) {
            var requests = application.infoRequest;
            requests.name = application.general.businessName;
            requests.listing = application._id;
            promises.push( requestsArray.push(requests) );
          });

          return $q.all(promises).then(function() {
            return requestsArray;
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Update a Request for More Information
     *
     * @return {String}
     */
    updateRequest(request) {
      return ListingService.getCurrentUser()
        .then(user => {
          return $http.post('/api/listings/request-more/update/' + request.listing, {
            request: request
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },


    /**
     * Confirm Bank
     *
     * @return {String}
     */
    confirmBank(amount) {
      return ListingService.getCurrentUser()
        .then(user => {
          if(amount === 101) {
            return $http.put('/api/users/' + user._id + '/confirm-account');
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },



    /**
     * Calculate Payment
     *
     * @return {String}
     */
    calculatePayment(amount, rate, term) {
      var rate = rate / 100;

      this.effectiveRate = +(Math.pow((1 + (rate / 12)), term)).toFixed(6);
      this.monthlyPayment = +((amount * (rate / 12) * this.effectiveRate) / (this.effectiveRate - 1)).toFixed(4);
      this.total = +(this.monthlyPayment * term).toFixed(2);
      this.cost = +(this.total - amount).toFixed(2);
      this.fees = +((this.total * 0.04) + 700).toFixed(2);
      this.totalPayment = +(this.cost + this.fees).toFixed(2);
      this.return = +(this.cost - (this.total * 0.01)).toFixed(2);
      this.monthly = {
        principal: +(amount / term).toFixed(2),
        interest: +(this.cost / term).toFixed(2),
        fees: +((this.total * 0.04) / term).toFixed(2),
        total: this.monthlyPayment
      };
    },



    /**
     * Generate Repayment Schedule
     *
     * @return {String}
     */
    generateSchedule(offers, term) {
      var promises = [];
      var total = 0;
      var repayments = [];
      var repayment = {};
      var monthly = {
        principal: 0,
        interest: 0,
        fees: 0,
        total: 0
      };

      angular.forEach(offers, function(offer) {
        total += offer.monthly.total;
        promises.push(repayments.push(offer));
      });

      angular.forEach(repayments, function(repayment) {
        monthly.principal += repayment.monthly.principal;
        monthly.interest += repayment.monthly.interest;
        promises.push(repayment);
      });

      monthly.fees = +( ( (total * 0.04) + 700) / term ).toFixed(2);
      monthly.total = monthly.principal + monthly.interest + monthly.fees;

      repayment.repayments = repayments;
      repayment.monthly = monthly;

      return $q.all(promises).then(function() {
        return repayment;
      });
    },



    /**
     * Create Repayment Schedule
     *
     * @return {String}
     */
    createSchedule(listing, offers, payment) {
      return ListingService.getCurrentUser()
      .then(user => {
        var promises = [];
        var repayments = [];
        var term = +(listing.details.term);
        var now = new Date();

        var repayment = {
          borrower: {
            user: user,
            payments: []
          },
          investors: [],
          listing: listing,
        };

        for(var i = 0; i < term; i++) {
          var date = new Date(now.getFullYear(), now.getMonth() + (1 + i), 1).toISOString();
          var borrowerRepayment = {
            date: date,
            amount: payment.total
          }
          promises.push(
            repayment.borrower.payments.push(borrowerRepayment)
          );
        }

        angular.forEach(offers, function(offer) {
          var amount = offer.monthly.principal + offer.monthly.interest;
          var investor = {
            user: offer.user,
            payments: []
          };

          for(var i = 0; i < term; i++) {
            var date = new Date(now.getFullYear(), now.getMonth() + (1 + i), 1).toISOString();
            var investorRepayment = {
              date: date,
              amount: amount
            }
            promises.push(
              investor.payments.push(investorRepayment)
            );
          }

          promises.push(repayment.investors.push(investor));
        });

        return $q.all(promises)
        .then(function() {
          return $http.post('/api/repayments', repayment)
          .then(() => {
            var date = new Date;
            listing.completed = date.toISOString();
            listing.status = 'closed';
            return $http.put('/api/listings' + listing._id, listing)
          });
        });
      });
    },



    /**
     * Get Repayments
     *
     * @return {String}
     */
    getRepayments() {
      return ListingService.getCurrentUser()
        .then(user => {
          return $http.get('/api/repayments/borrower/' + user._id);
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  };

  return Borrower;
}

angular.module('investnextdoorCaApp')
  .factory('Borrower', BorrowerService);

})();
