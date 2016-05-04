'use strict';

class NavbarController {
  constructor(Auth, appConfig, $scope, Borrower, ListingService) {
    var vm = this;
    vm.$scope = $scope;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.isBorrower = Auth.isBorrower;
    vm.isInvestor = Auth.isInvestor;
    vm.ListingService = ListingService;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.site = appConfig.SITE;
    vm.$scope.hasListing = false;

    vm.$scope.button = 'default';

    vm.ListingService.getCurrentUser()
    .then(user => {
      if(!user) {
        return false;
      }
      
      if(user.role === 'borrower') {
        vm.$scope.button = 'borrower';
        Borrower.getApplications().then(listings => {
          if(listings.length > 0) {
            vm.$scope.hasListing = true;
            vm.$scope.listing = listings[0];
            vm.$scope.listingID = vm.$scope.listing._id;
          }
        });
      } else if (user.role === 'investor') {
        vm.$scope.button = 'investor';
      }
    });

    this.isCollapsed = true;
    //end-non-standard

    Auth.getCurrentUser(null)
    .then(user => {
      this.currentUser = user;
    })
  }
}

angular.module('investnextdoorCaApp')
  .controller('NavbarController', NavbarController);
