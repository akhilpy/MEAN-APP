'use strict';

(function() {

class WidgetFinderController {
  constructor($scope, ngDialog) {
    var widget = this;
    widget.ngDialog = ngDialog;
    widget.$scope = $scope;

    this.$scope.dialogModel = {
      title: 'Investment Finder',
      message: 'Your results will be shown here.'
    }
  }

  open() {
    this.ngDialog.open({
      template: 'dialog.default',
      className: 'ngdialog-theme-default',
      scope: this.$scope
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('WidgetFinderController', WidgetFinderController);

})();
