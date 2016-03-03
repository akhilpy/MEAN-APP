'use strict';

angular.module('investnextdoorCaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
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
          bookmarks: function() { return []; }
        }
      })
      .state('dashboard.index', {
        url: '',
        authenticate: true,
        onEnter: function($state, Auth) {
          var user = Auth.getCurrentUser();
          if (user.role == 'borrower') {
            $state.go('dashboard.borrower');
          } else if (user.role == 'investor') {
            $state.go('dashboard.investor.actions');
          } else if (user.role == 'admin') {
            $state.go('admin.index');
          }
        }
      })
      .state('dashboard.borrower', {
        url: '',
        templateUrl: 'app/account/dashboard/dashboard.borrower.html',
        authenticate: true
      })
      .state('dashboard.investor', {
        url: '',
        templateUrl: 'app/account/dashboard/dashboard.investor.html',
        authenticate: true,
        controller: 'DashboardController',
        controllerAs: 'vm',
        resolve: {
          bookmarks: ['Investor',
            function(Investor) {
              return Investor.getBookmarks();
            }
          ]
        }
      })
      .state('dashboard.investor.actions', {
        url: '/actions',
        templateUrl: 'app/account/dashboard/dashboard.actions.html',
        authenticate: true
      })
      .state('dashboard.investor.investments', {
        url: '/investments',
        templateUrl: 'app/account/dashboard/dashboard.investments.html',
        authenticate: true
      })
      .state('dashboard.investor.offers', {
        url: '/offers',
        templateUrl: 'app/account/dashboard/dashboard.offers.html',
        authenticate: true
      })
      .state('dashboard.investor.statements', {
        url: '/statements',
        templateUrl: 'app/account/dashboard/dashboard.statements.html',
        authenticate: true
      })
      .state('dashboard.investor.watchlist', {
        url: '/watchlist',
        templateUrl: 'app/account/dashboard/dashboard.watchlist.html',
        authenticate: true
      })
      .state('dashboard.investor.agreements', {
        url: '/agreements',
        templateUrl: 'app/account/dashboard/dashboard.agreements.html',
        authenticate: true
      })
      .state('dashboard.investor.pending', {
        url: '/pending',
        templateUrl: 'app/account/dashboard/dashboard.pending.html',
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
        url: '/account/listing',
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
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
