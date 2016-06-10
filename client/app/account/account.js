'use strict';

angular.module('investnextdoorCaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login?ref',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'login',
        template: '',
        controller: function($state, Auth) {
          var referrer = 'login';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        abstract: true,
        resolve: {
          investorInfo: function() { return []; },
          bookmarks: function() { return []; },
          offers: function() { return []; },
          offer: function() { return []; }
        }
      })
      .state('dashboard.index', {
        url: '',
        authenticate: true,
        onEnter: function($state, Auth) {
          return Auth.getCurrentUser(null)
            .then(user => {
              if (user.role === 'borrower') {
                $state.go('dashboard.borrower.actions.index');
              } else if (user.role === 'investor') {
                $state.go('dashboard.investor.actions.index');
              } else if (user.role === 'affiliate') {
                $state.go('dashboard.investor.actions.index');
              } else if (user.role === 'admin') {
                $state.go('admin.index');
              }
            });
        }
      })
      .state('dashboard.borrower', {
        url: '/borrower',
        templateUrl: 'app/account/dashboard/borrower/dashboard.html',
        authenticate: true,
        resolve: {
          offer: function() { return []; }
        },
        controller: 'BorrowerController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: 'Dashboard'
        }
      })
      .state('dashboard.borrower.actions', {
        url: '/actions',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.html',
        authenticate: true,
        resolve: {
          offer: function() { return []; }
        },
        abstract: true
      })
      .state('dashboard.borrower.actions.index', {
        url: '',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.index.html',
        authenticate: true
      })
      .state('dashboard.borrower.actions.account', {
        url: '/account',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.account.html',
        authenticate: true
      })
      .state('dashboard.borrower.actions.addAccount', {
        url: '/add-account',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.add-account.html',
        authenticate: true
      })
      .state('dashboard.borrower.actions.complete', {
        url: '/complete',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.complete.html',
        controller: 'BorrowerController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('dashboard.borrower.actions.accept', {
        url: '/accept/:offer',
        templateUrl: 'app/account/dashboard/borrower/dashboard.actions.accept.html',
        authenticate: true,
        controller: 'BorrowerController',
        controllerAs: 'vm',
      })
      .state('dashboard.borrower.listings', {
        url: '/listings',
        templateUrl: 'app/account/dashboard/borrower/dashboard.listings.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.borrower.listings.index', {
        url: '',
        templateUrl: 'app/account/dashboard/borrower/dashboard.listings.index.html',
        authenticate: true
      })
      .state('dashboard.borrower.listings.actions', {
        url: '/:id/actions',
        templateUrl: 'app/account/dashboard/borrower/dashboard.listings.actions.html',
        authenticate: true
      })
      .state('dashboard.borrower.offers', {
        url: '/offers',
        templateUrl: 'app/account/dashboard/borrower/dashboard.offers.html',
        controller: 'BorrowerController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('dashboard.borrower.statements', {
        url: '/statements',
        templateUrl: 'app/account/dashboard/borrower/dashboard.statements.html',
        authenticate: true
      })
      .state('dashboard.borrower.repayments', {
        url: '/repayments',
        templateUrl: 'app/account/dashboard/borrower/dashboard.repayments.html',
        authenticate: true
      })
      .state('dashboard.borrower.requests', {
        url: '/requests',
        templateUrl: 'app/account/dashboard/borrower/dashboard.requests.html',
        authenticate: true
      })
      .state('dashboard.investor', {
        url: '/investor',
        templateUrl: 'app/account/dashboard/investor/dashboard.html',
        authenticate: true,
        controller: 'InvestorController',
        controllerAs: 'vm'
      })
      .state('dashboard.investor.actions', {
        url: '/actions',
        templateUrl: 'app/account/dashboard/investor/dashboard.actions.html',
        authenticate: true,
        abstract: true
      })
      .state('dashboard.investor.actions.index', {
        url: '',
        templateUrl: 'app/account/dashboard/investor/dashboard.actions.index.html',
        authenticate: true
      })
      .state('dashboard.investor.actions.account', {
        url: '/account',
        templateUrl: 'app/account/dashboard/investor/dashboard.actions.account.html',
        authenticate: true
      })
      .state('dashboard.investor.actions.addAccount', {
        url: '/add-account',
        templateUrl: 'app/account/dashboard/investor/dashboard.actions.add-account.html',
        authenticate: true
      })
      .state('dashboard.investor.investments', {
        url: '/investments',
        templateUrl: 'app/account/dashboard/investor/dashboard.investments.html',
        authenticate: true
      })
      .state('dashboard.investor.offers', {
        url: '/offers',
        templateUrl: 'app/account/dashboard/investor/dashboard.offers.html',
        authenticate: true
      })
      .state('dashboard.investor.repayments', {
        url: '/repayments',
        templateUrl: 'app/account/dashboard/investor/dashboard.repayments.html',
        authenticate: true
      })
      .state('dashboard.investor.statements', {
        url: '/statements',
        templateUrl: 'app/account/dashboard/investor/dashboard.statements.html',
        authenticate: true
      })
      .state('dashboard.investor.watchlist', {
        url: '/watchlist',
        templateUrl: 'app/account/dashboard/investor/dashboard.watchlist.html',
        authenticate: true
      })
      .state('dashboard.investor.agreements', {
        url: '/agreements',
        templateUrl: 'app/account/dashboard/investor/dashboard.agreements.html',
        authenticate: true
      })
      .state('profile', {
        url: '/account/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        authenticate: true,
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ]
        },
      })
      .state('listing', {
        url: '/account/listing/:id',
        templateUrl: 'app/account/listing/listing.html',
        resolve: {
          currentUser: function() { return {}; },
          currentListing: function() { return {}; }
        },
        abstract: true,
        authenticate: true
      })
      .state('listing.general', {
        url: '/general',
        templateUrl: 'app/account/listing/listing.general.html',
        authenticate: true,
        controller: 'ListingController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ],
          currentListing: ['ListingService',
            function(ListingService) {
              return ListingService.getOne();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'General',
          parent: 'dashboard.borrower'
        }
      })
      .state('listing.details', {
        url: '/details',
        templateUrl: 'app/account/listing/listing.details.html',
        authenticate: true,
        controller: 'ListingController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ],
          currentListing: ['ListingService',
            function(ListingService) {
              return ListingService.getOne();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Details',
          parent: 'dashboard.borrower'
        }
      })
      .state('listing.financial', {
        url: '/financial',
        templateUrl: 'app/account/listing/listing.financial.html',
        authenticate: true,
        controller: 'ListingController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ],
          currentListing: ['ListingService',
            function(ListingService) {
              return ListingService.getOne();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Financial',
          parent: 'dashboard.borrower'
        }
      })
      .state('listing.social', {
        url: '/social',
        templateUrl: 'app/account/listing/listing.social.html',
        authenticate: true,
        controller: 'ListingController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ],
          currentListing: ['ListingService',
            function(ListingService) {
              return ListingService.getOne();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Social',
          parent: 'dashboard.borrower'
        }
      })
      .state('listing.terms', {
        url: '/terms',
        templateUrl: 'app/account/listing/listing.terms.html',
        authenticate: true,
        controller: 'ListingController',
        controllerAs: 'vm',
        resolve: {
          currentUser: ['ListingService',
            function(ListingService) {
              return ListingService.getCurrentUser();
            }
          ],
          currentListing: ['ListingService',
            function(ListingService) {
              return ListingService.getOne();
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'Terms',
          parent: 'dashboard.borrower'
        }
      })
      .state('dashboard.affiliate', {
        url: '/affiliate',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.html',
        authenticate: true,
        abstract: true,
        controller: 'AffiliateController',
        controllerAs: 'vm'
      })
      .state('dashboard.affiliate.index', {
        url: '',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.index.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.investors', {
        url: '/investors',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.investors.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.investments', {
        url: '/investments',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.investments.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.offers', {
        url: '/offers',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.offers.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.borrowers', {
        url: '/borrowers',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.borrowers.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.listings', {
        url: '/listings',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.listings.html',
        authenticate: true,
      })
      .state('dashboard.affiliate.loans', {
        url: '/loans',
        templateUrl: 'app/account/dashboard/affiliate/dashboard.loans.html',
        authenticate: true,
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
