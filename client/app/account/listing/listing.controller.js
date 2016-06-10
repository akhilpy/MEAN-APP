'use strict';

(function() {

class ListingController {
  constructor($state, $scope, Form, ListingService, currentUser, currentListing, Payments, $http, Emails, $location, ngDialog) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.$http = $http;
    vm.ListingService = ListingService;
    vm.Payments = Payments;
    vm.Emails = Emails;
    vm.Form = Form;
    vm.ngDialog = ngDialog;
    vm.errors = {};
    vm.submitted = false;
    vm.$scope.saving = false;

    vm.user = currentUser;
    vm.currentListing = currentListing.data;
    vm.listingID = vm.currentListing._id;

    if(Object.keys(currentListing).length !== 0) {
      vm.status = vm.currentListing.admin.basics.status;
    } else {
      vm.status = 'in-progress';
    }

    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.pageData = vm.ListingService.pageData;

    vm.options = {
      formState: {
        disabled: true
      }
    };
    if(vm.status == 'in-progress') {
      vm.options.formState.disabled = false;
    }

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms')
    };

    vm.$scope.$on('saveForm', function() {
      var form = vm.$scope.listing;
      vm.saveListing(form);
    });

  }

  saveListing(form) {
    var vm = this;
    vm.$scope.saving = true;
    vm.submitted = true;

    vm.ListingService.saveOne(vm.currentListing)
    .then(data => {
      vm.$scope.saving = false;
    })
    .catch(err => {
      console.log(err);
    });

  }

  submitListing(form, account) {
    var vm = this;
    vm.submitted = true;

    if(!vm.user.bankAccount.verified && !account) {

      vm.ngDialog.open({
        template: 'app/account/listing/lightbox.addAccount.html',
        scope: vm.$scope
      });

    } else {

      if(account) {
        vm.errors.addAccount = false;
        vm.$scope.loading = true;

        vm.saveListing(form);

        return vm.Payments.addAccount(account)
        .then(response => {
          if(response.data.status !== 'success') {
            return vm.Payments.updateAccount(account);
          }
        })
        .then(() => {
          return vm.Payments.verifyAccount(account)
          .then(response => {
            vm.$scope.loading = false;

            var transaction = {
              user: vm.user,
              method: 'CBF',
              amount: 200,
              type: 'direct_debit',
              kind: 'Listing'
            }

            return vm.Payments.createTransaction(transaction)
            .then(response => {
              if(response.status === 'success') {
                vm.$http.put('/api/users/' + vm.user._id, {
                  user: vm.user
                }).then(response => {
                  return vm.ListingService.submitOne(vm.listingID)
                  .then(() => {
                    var email = {
                      firstname: vm.user.name.first,
                      email: vm.user.email,
                      business: {
                        name: vm.currentListing.general.businessName,
                        id: vm.currentListing._id
                      }
                    }
                    vm.ngDialog.close();
                    vm.$state.go('dashboard.index');
                    return vm.Emails.listingSubmitted(email);
                  });
                })
                .catch(err => {
                  console.log(err);
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            vm.$scope.loading = false;
            vm.errors.addAccount = 'Please check your account details and try again.';
          });
        })
        .catch(err => {
          vm.$scope.loading = false;
          vm.errors.addAccount = 'Please check your account details and try again.';
        });
      } else {
        vm.$scope.loading = false;
        vm.errors.addAccount = 'Please check your account details and try again.';
      }

    }

  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingController', ListingController);

})();
