'use strict';

angular.module('investnextdoorCaApp')
  .directive('chosen', function($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        scope.$watch(attrs.ngModel, function() {
          $timeout(function() {
            element.trigger('chosen:updated');
          }, 0, false);
        }, true);

        $timeout(function() {
          element.chosen({
            disable_search_threshold: attrs.disableSearchThreshold,
            placeholder_text_single: attrs.dataPlaceholder,
            placeholder_text_multiple: attrs.dataPlaceholder
          });
        }, 0, false);
      }
    };
  });
