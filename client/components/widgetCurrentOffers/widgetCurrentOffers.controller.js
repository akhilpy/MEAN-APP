'use strict';

(function() {

class WidgetCurrentOffersController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;
    widget.$scope.makeOutbid = false;

    if(this.$scope.vm.currentOffers.length > 0) {
      var rates = 0

      angular.forEach(this.$scope.vm.currentOffers, function(offer) {
        rates += offer.rate;
      });

      $scope.vm.averageRate = Math.ceil(rates / this.$scope.vm.currentOffers.length);
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
