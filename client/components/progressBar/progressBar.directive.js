'use strict';

angular.module('investnextdoorCaApp')
  .directive('progressBar', function () {
    return {
      templateUrl: 'components/progressBar/progressBar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        attrs.$observe('progressBar', function() {
          scope.progress = attrs.progressBar;
        });
      }
    };
  });
