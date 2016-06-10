'use strict';

(function() {

class WidgetCurrentOffersController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;
    widget.$scope.makeOutbid = false;
    widget.$scope.showCurrentOffersWidget = true;

    widget.$scope.outbidRate = widget.$scope.offerWidget.newOffer.rate - 1;

    if($scope.vm.currentUser.role === 'borrower' || $scope.vm.currentListing.admin.basics.status === 'closed') {
      widget.$scope.showCurrentOffersWidget = false;
    }

    if(this.$scope.vm.currentOffers.all.length > 0) {
      var rates = 0;
      var averageOffers = [];

      angular.forEach(this.$scope.vm.currentOffers.all, function(offer) {
        if(offer.status === 'live' || offer.status === 'pending') {
          rates += offer.rate;
          averageOffers.push(offer);
        }
      });

      $scope.vm.averageRate = Math.ceil(rates / averageOffers.length);
    } else {
      $scope.vm.averageRate = false;
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
