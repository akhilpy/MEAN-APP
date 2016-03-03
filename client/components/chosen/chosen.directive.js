'use strict';
/*jshint camelcase: false */

angular.module('investnextdoorCaApp')
  .directive('chosen', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        // update the select when data is loaded
        scope.$watch(attrs.chosen, function() {
          element.trigger('chosen:updated');
        });

        // update the select when the model changes
        scope.$watch(attrs.ngModel, function() {
          element.trigger('chosen:updated');
        });

        element.chosen({
          disable_search_threshold: attrs.disableSearchThreshold,
          placeholder_text_single: attrs.dataPlaceholder,
          placeholder_text_multiple: attrs.dataPlaceholder,
          allow_single_deselect: true
        });
      }
    };
  });
