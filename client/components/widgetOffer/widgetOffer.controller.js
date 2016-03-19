'use strict';

(function() {

class WidgetOfferController {
  constructor($scope, Offers, Investor, ListingService) {
    var widget = this;
    widget.$scope = $scope;
    widget.Offers = Offers;
    widget.investorInfo = Investor.getInvestorInfo();

    widget.$scope.balance = 0;
    widget.$scope.offered = false;

    widget.newOffer = {
      rate: widget.$scope.vm.currentListing.admin.basics.listedRate,
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
      widget.Offers.new(widget.newOffer);
      widget.$scope.offered = true;
      widget.$scope.balance -= widget.newOffer.amount;
      widget.$scope.$apply();
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetOfferController', WidgetOfferController);

})();
