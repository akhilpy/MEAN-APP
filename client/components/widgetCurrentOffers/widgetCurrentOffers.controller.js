'use strict';

(function() {

class WidgetCurrentOffersController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;
    widget.$scope.makeOutbid = false;

    console.log(this.$scope.vm.currentOffers);

    if(this.$scope.vm.currentOffers.live.length > 0) {
      var rates = 0

      angular.forEach(this.$scope.vm.currentOffers.live, function(offer) {
        rates += offer.rate;
      });

      $scope.vm.averageRate = Math.ceil(rates / this.$scope.vm.currentOffers.live.length);
    }
  }

  outbid() {
    this.$scope.makeOutbid = true;
    this.$scope.offerWidget.newOffer.rate = this.$scope.vm.averageRate;
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetCurrentOffersController', WidgetCurrentOffersController);

})();
