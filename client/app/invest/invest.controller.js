'use strict';

(function() {

  class InvestController {
    constructor($scope) {
      var vm = this;
      vm.$scope = $scope;

      vm.$scope.panesA = [
        {
          id: 'pane-1a',
          header: 'Step 1:',
          subtitle: 'Set up your account',
          content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.',
          isExpanded: true
        },
        {
          id: 'pane-2a',
          header: 'Step 2:',
          subtitle: 'Access the Marketplace',
          content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
        },
        {
          id: 'pane-3a',
          header: 'Step 3:',
          subtitle: 'Make an Investment',
          content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',
        }
      ];

      vm.$scope.expandCallback = function (index, id) {
        console.log('expand:', index, id);
      };

      vm.$scope.collapseCallback = function (index, id) {
        console.log('collapse:', index, id);
      };

      vm.$scope.$on('accordionA:onReady', function () {
        console.log('accordionA is ready!');
      });
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('InvestController', InvestController);

})();
