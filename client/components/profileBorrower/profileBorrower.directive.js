'use strict';

angular.module('investnextdoorCaApp')
  .directive('profileBorrower', function () {
    return {
      templateUrl: 'components/profileBorrower/profileBorrower.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });
