'use strict';

(function() {

class WidgetCurrentOffersController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;

    this.$scope.dialogModel = {
      title: 'Outbid',
      message: 'Details on your offer will be shown here.'
    }
  }

  outbid() {
    this.ngDialog.open({
      template: 'dialog.default',
      className: 'ngdialog-theme-default',
      scope: this.$scope
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetCurrentOffersController', WidgetCurrentOffersController);

})();
