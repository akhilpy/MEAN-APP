'use strict';

(function() {

class AdminOfferController {
  constructor(currentUser, $state, offers, Offers) {
    var vm = this;
    vm.Offers = Offers;

    vm.offers = offers.data;
    vm.user = currentUser;
  }

  updateOffer(offer, status) {
    var vm = this;
    offer.status = status;
    vm.Offers.updateOffer(offer);
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminOfferController', AdminOfferController);

})();
