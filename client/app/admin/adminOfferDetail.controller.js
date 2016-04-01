'use strict';

(function() {

class AdminOfferDetailController {
  constructor(currentUser, offer, Offers) {
    var vm = this;
    vm.Offers = Offers;

    vm.offer = offer.data;
    vm.user = currentUser;
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
