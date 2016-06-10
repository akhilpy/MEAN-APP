'use strict';

(function() {

class AdminOfferDetailController {
  constructor(currentUser, offer, Offers, Emails, $scope) {
    var vm = this;
    vm.Offers = Offers;
    vm.$scope = $scope;

    vm.offer = offer.data;
    vm.user = currentUser;

    vm.allStatus = [
      {value: 'pending', label: 'Review'},
      {value: 'live', label: 'Live'},
      {value: 'rejected', label: 'Cancelled'},
      {value: 'outbid', label: 'Outbid'},
      {value: 'accepted', label: 'Accepted'}
    ]
  }

  updateOffer(offer, status) {
    var vm = this;
    vm.$scope.saving = true;

    if(status) {
      offer.status = status;
    }

    if(status === 'live') {
      var html = '<p>Hello ' + offer.user.name.first + ',</p><p>Your offer of ' + offer.amount + ' for '  + offer.tate + '% to ' + offer.listing.general.businessName + ' is now live.  We will let you know if your offer is outbid or is accepted.</p><p>Thank you,<br>The InvestNextDoor Team</p>';
      var email = {
        to: offer.user.email,
        subject: 'Your offer is now live.',
        html: html
      }
      vm.Emails.new(email);
    } else if(status === 'rejected') {
      var html = '<p>Hello ' + offer.user.name.first + ',</p><p>Unfortunately your offer to ' + offer.listing.general.businessName + ' has been rejected.  You can either place another bid or check out our Marketplace for another potential business who would really appreciate your help!</p><p>Thank you,<br>The InvestNextDoor Team</p>';
      var email = {
        to: offer.user.email,
        subject: 'Your offer has been rejected.',
        html: html
      }
      vm.Emails.new(email);
    }

    vm.Offers.updateOffer(offer)
    .then(response => {
      vm.$scope.saving = false;
    })
    .catch(err => {
      console.log(err);
    })
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminOfferDetailController', AdminOfferDetailController);

})();
