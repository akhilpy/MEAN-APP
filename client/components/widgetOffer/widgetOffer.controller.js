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
    widget.$scope.showOfferWidget = true;

    if(widget.$scope.vm.currentUser.role === 'borrower' || widget.$scope.vm.currentListing.admin.basics.status === 'closed') {
      widget.$scope.showOfferWidget = false;
    }

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

    if(widget.$scope.vm.currentUser.balance < widget.newOffer.amount) {
      widget.$scope.error = true;
      widget.$scope.errorMessage = 'This offer exceeds your current balance.<br><br><a href="/dashboard" class="button">Add Funds</a>';
      return;
    }

    if(widget.newOffer && !widget.$scope.offered) {
      widget.newOffer.listing = widget.$scope.vm.currentListing;
      widget.Offers.new(widget.newOffer, widget.newOffer.listing)
      .then(result => {
        if(result) {
          widget.$scope.offered = true;
          widget.$scope.balance -= widget.newOffer.amount;
          widget.socket.syncUpdates('offer', widget.$scope.vm.currentOffers);
          widget.$scope.error = false;
        } else {
          widget.$scope.error = true;
          widget.$scope.errorMessage = 'Your offer could not be placed as it exceeds your current maximum offer.';
        }
      });
    }

  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetOfferController', WidgetOfferController);

})();
