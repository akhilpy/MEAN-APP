'use strict';

(function() {

class AdminController {
  constructor(listings, users, ListingService) {
    var vm = this;
    vm.ListingService = ListingService;
    vm.sortType = 'general.businessName';
    vm.sortReverse = false;
    vm.searchListings = '';
    vm.allListings = listings.data;
    vm.users = users.data;
  }

  delete(user) {
    var vm = this;
    user.$remove();
    vm.users.splice(vm.users.indexOf(user), 1);
  }

  edit(user) {
    var vm = this;
    alert('Editing: ' + user.name.first + ' ' + user.name.last);
  }

  approve(listingID) {
    var vm = this;
    vm.ListingService.approveOne(listingID);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminController', AdminController);

})();
