'use strict';

(function() {

class AdminOfferDetailController {
  constructor(currentUser, offer, Offers) {
    var vm = this;
    vm.Offers = Offers;

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

    if(status) {
      offer.status = status;
    }

    vm.Offers.updateOffer(offer);
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminOfferDetailController', AdminOfferDetailController);

})();
