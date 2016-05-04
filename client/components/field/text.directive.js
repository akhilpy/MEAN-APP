'use strict';

angular.module('investnextdoorCaApp')
  .directive('fieldText', function () {
    return {
      templateUrl: 'components/field/text.html',
      restrict: 'EA',
      scope: {
        model: '=model'
      },
      link: function (scope, element, attrs) {
        scope.label = attrs.label,
        scope.description = attrs.description,
        scope.placeholder = attrs.placeholder,
        scope.icon = attrs.icon
      }
    };
  });
