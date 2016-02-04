'use strict';

angular.module('investnextdoorCaApp')
  .directive('applicationStatus', function (Application) {
    return {
      templateUrl: 'components/application/applicationStatus.html',
      restrict: 'EA',
      link: function (scope) {

        scope.status = {
          general: Application.getPageStatus('general'),
          details: Application.getPageStatus('details'),
          financial: Application.getPageStatus('financial'),
          social: Application.getPageStatus('social'),
          terms: Application.getPageStatus('terms'),
        };

      }
    };
  });
