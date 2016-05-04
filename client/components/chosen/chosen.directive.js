'use strict';
/*jshint camelcase: false */

angular.module('investnextdoorCaApp')
  .directive('chosen', function($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        // update the select when data is loaded
        scope.$watch('chosen', function() {
          element.trigger('chosen:updated');
        });

        // update the select when the model changes
        scope.$watch('ngModel', function() {
          element.trigger('chosen:updated');
        });

        // update chosen if the select is disabled
        scope.$watch(attrs.ngModel, function() {
          element.trigger('chosen:updated');
        });

        scope.$watch('ngOptions', function() {
          element.trigger('chosen:updated');
        });

        // update chosen if the select is disabled
        attrs.$observe('disabled', function() {
          element.trigger('chosen:updated');
        });

        attrs.$observe('placeholder_text_single', function() {
          element.trigger('chosen:updated');
        });

        attrs.$observe('placeholder_text_multiple', function() {
          element.trigger('chosen:updated');
        });

        $rootScope.$on('updateChosen', function() {
          console.log('updated');
          element.trigger('chosen:updated');
        });

        $rootScope.$on('resetChosen', function() {
          element.val(0);
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
