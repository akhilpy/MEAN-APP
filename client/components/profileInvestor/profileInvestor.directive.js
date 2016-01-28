'use strict';

angular.module('investnextdoorCaApp')
  .directive('profileInvestor', function () {
    return {
      templateUrl: 'components/profileInvestor/profileInvestor.html',
      restrict: 'EA',
      link: function () {
      }
    };
  });
