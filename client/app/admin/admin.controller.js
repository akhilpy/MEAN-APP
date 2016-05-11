'use strict';

(function() {

class AdminController {
  constructor(listings, users, offers, ListingService, $state, $stateParams, $scope, Auth, $filter, socket, $rootScope, moment, $q, Offers, Emails) {
    var vm = this;
    vm.$state = $state;
    vm.$q = $q;
    vm.$filter = $filter;
    vm.$scope = $scope;
    vm.socket = socket;
    vm.$stateParams = $stateParams;
    vm.ListingService = ListingService;
    vm.Offers = Offers;
    vm.Auth = Auth;

    vm.listings = vm.$filter('orderBy')(listings.data, 'date', true);
    vm.allListings = vm.listings;
    vm.users = users.data;
    vm.offers = offers.data;

    vm.$scope.sortType = '-joined';
    vm.$scope.sortReverse = false;
    vm.$scope.searchListings = '';

    if(vm.$stateParams.status) {
      vm.$scope.breadcrumb = vm.$stateParams.status;
    } else if(vm.$stateParams.role) {
      vm.$scope.breadcrumb = vm.$stateParams.role;
    }

    vm.adminEditing = true;
    vm.searchTerm = '';

    $rootScope.$on('updateUsers', function() {
      vm.socket.syncUpdates('user', vm.users);
    });

    $scope.$on('$destroy', function() {
      vm.socket.unsyncUpdates('user');
    });

    $scope.$watch('vm.searchTerm', function(val) {
      vm.allListings = vm.$filter('filter')(vm.listings, val);
    });

    vm.$scope.exportListings = [];
    vm.$scope.canExport = false;
    var exportPromises = [];
    angular.forEach(vm.allListings, function(listing, key) {
      listing.offers = 0;
      listing.amountFunded = 0;
      listing.funded = 0;
      listing.offersPromises = [];

      exportPromises.push(
        vm.Offers.getListingOffers(listing._id)
      .then(offers => {
        listing.offers = offers.live.length;

        angular.forEach(offers.all, function(offer, key) {
          if(offer.status !== 'pending' && offer.status !== 'outbid' && offer.status !== 'rejected') {
            listing.amountFunded += offer.amount;
          }
          listing.offersPromises.push(offer);
        });

        exportPromises.push(
          vm.ListingService.getUserOne(listing._id)
          .then(user => {
            var listingRow = {};

            if(user) {
              var term = '';
              if(listing.details.term) {
                term = listing.details.term + ' Months';
              }

              var city = '';
              if(listing.general.address && listing.general.address.city) {
                city = listing.general.address.city;
              }

              var province = '';
              if(listing.general.address && listing.general.address.province) {
                province = listing.general.address.province;
              }

              var created = new Date(listing.date);
              var createdFormatted = moment(created).format('YYYY-MM-DD');

              var submitted, submittedFormatted;
              if(listing.admin.basics.submitted) {
                submitted = new Date(listing.admin.basics.submitted);
                if(moment(submitted).isValid()) {
                  submittedFormatted = moment(submitted).format('YYYY-MM-DD');
                } else {
                  submittedFormatted = '';
                }
              } else {
                submittedFormatted = '';
              }

              var completed, completedFormatted;
              if(listing.admin.basics.completed) {
                completed = new Date(listing.admin.basics.completed);
                if(moment(completed).isValid()) {
                  completedFormatted = moment(completed).format('YYYY-MM-DD');
                } else {
                  completedFormatted = '';
                }
              } else {
                completedFormatted = '';
              }

              var published, publishedFormatted;
              if(listing.admin.basics.published) {
                published = new Date(listing.admin.basics.published);
                if(moment(published).isValid()) {
                  publishedFormatted = moment(published).format('YYYY-MM-DD');
                } else {
                  publishedFormatted = '';
                }
              } else {
                publishedFormatted = '';
              }

              var deadline, deadlineFormatted;
              if(listing.admin.basics.deadline) {
                deadline = new Date(listing.admin.basics.deadline);
                if(moment(deadline).isValid()) {
                  deadlineFormatted = moment(deadline).format('YYYY-MM-DD');
                } else {
                  deadlineFormatted = '';
                }
              } else {
                deadlineFormatted = '';
              }

              var goal = listing.details.amount;
              if(listing.amountFunded) {
                listing.funded = +((listing.amountFunded / goal) * 100).toFixed(0);
                if(listing.funded > 100) {
                  listing.funded = 100;
                }
              } else {
                listing.funded = 0;
              }

              listingRow = {
                id: listing._id,
                business: listing.general.businessName,
                status: listing.admin.basics.status,
                submitted: submittedFormatted,
                published: publishedFormatted,
                completed: completedFormatted,
                amount: listing.details.amount,
                borrowerRate: listing.admin.basics.userRate,
                benchmarkRate: listing.admin.basics.benchmarkRate,
                term: term,
                closes: deadlineFormatted,
                type: listing.admin.basics.listingType,
                city: city,
                province: province,
                title: listing.details.title,
                email: user.email,
                phone: listing.general.phone,
                funded: listing.funded,
                offers: listing.offers,
                affiliate: ''
              }
            }

            vm.$scope.exportListings.push(listingRow);
            return;
          })
        );
      })
      );
    });

    vm.$q.all(exportPromises).then(function() {
      vm.$scope.canExport = true;
    });
  }

  delete(user) {
    this.Auth.delete(user._id);
    this.users.splice(this.users.indexOf(user), 1);
  }

  edit(user) {
    var vm = this;
    alert('Editing: ' + user.name.first + ' ' + user.name.last);
  }

  approve(listingID) {
    var vm = this;
    vm.ListingService.approveOne(listingID);
  }

  deleteListing(listing) {
    this.ListingService.deleteOne(listing._id);
    this.allListings.splice(this.allListings.indexOf(listing), 1);
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminController', AdminController);

})();
