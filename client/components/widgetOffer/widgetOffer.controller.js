'use strict';

(function() {

class WidgetOfferController {
  constructor($scope, Offers, Investor) {
    var widget = this;
    widget.$scope = $scope;
    widget.Offers = Offers;
    widget.investorInfo = Investor.getInvestorInfo();

    widget.$scope.balance = 0;
    widget.$scope.offered = false;

    Investor.getInvestorInfo().then(data => {
      widget.$scope.balance = data.balance;
    });

    widget.$scope.rates = [
      {
        label: '10%',
        value: 10
      },
      {
        label: '11%',
        value: 11
      },
      {
        label: '12%',
        value: 12
      }
    ]

    widget.$scope.amounts = [
      {
        label: '$500',
        value: 500
      },
      {
        label: '$1000',
        value: 1000
      },
      {
        label: '$1500',
        value: 1500
      }
    ]
  }

  makeOffer() {
    var widget = this;
    if(widget.newOffer && !widget.$scope.offered) {
      widget.newOffer.listing = widget.$scope.vm.currentListing;
      widget.Offers.new(widget.newOffer);
      widget.$scope.offered = true;
      widget.$scope.balance -= widget.newOffer.amount;
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetOfferController', WidgetOfferController);

})();
