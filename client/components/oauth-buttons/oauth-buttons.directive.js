'use strict';

angular.module('investnextdoorCaApp')
  .directive('oauthButtons', () => ({
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
  }));
