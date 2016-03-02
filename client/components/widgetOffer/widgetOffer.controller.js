'use strict';

(function() {

class WidgetOfferController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;

    this.$scope.dialogModel = {
      title: 'Make an Offer',
      message: 'Details on your offer will be shown here.'
    }
  }

  offer() {
    this.ngDialog.open({
      template: 'dialog.default',
      className: 'ngdialog-theme-default',
      scope: this.$scope
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetOfferController', WidgetOfferController);

})();
