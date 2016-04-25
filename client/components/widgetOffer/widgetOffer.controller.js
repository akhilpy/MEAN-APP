'use strict';

(function() {

class WidgetOfferController {
  constructor($scope, Offers, Investor, ListingService, socket) {
    var widget = this;
    widget.$scope = $scope;
    widget.socket = socket;
    widget.Offers = Offers;
    widget.investorInfo = Investor.getInvestorInfo();

    widget.$scope.balance = 0;
    widget.$scope.offered = false;
    widget.$scope.error = false;

    widget.newOffer = {
      rate: widget.$scope.vm.currentListing.admin.basics.userRate,
      amount: widget.$scope.vm.currentListing.admin.basics.investment.min
    };

    Investor.getInvestorInfo().then(data => {
      widget.$scope.balance = data.balance;
    });

    widget.$scope.rates = ListingService.getRates('Rate*');
    widget.$scope.amounts = ListingService.getAmounts('Amount*', widget.$scope.vm.currentListing);
  }

  makeOffer() {
    var widget = this;
    if(widget.newOffer && !widget.$scope.offered) {
      widget.newOffer.listing = widget.$scope.vm.currentListing;
      widget.Offers.new(widget.newOffer, widget.newOffer.listing)
      .then(result => {
        if(result.value) {
          widget.$scope.offered = true;
          widget.$scope.balance -= widget.newOffer.amount;
          widget.socket.syncUpdates('offer', widget.$scope.vm.currentOffers);
          widget.$scope.error = false;
        } else {
          widget.$scope.error = true;
        }
      });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetOfferController', WidgetOfferController);

})();
