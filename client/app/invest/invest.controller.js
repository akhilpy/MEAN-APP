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
          list: [
            {
              title: 'Account Profile',
              content: 'Complete your account profile and set your investor status. Due to regulations, we require your profile to be approved before we can show you listings available to you.'
            },
            {
              title: 'Link Your Bank Account',
              content: 'We are required to ensure you have an active Canadian bank account. Just like with a PayPal or an investment account, we need this for regulatory reasons.'
            }
          ],
          isExpanded: true
        },
        {
          id: 'pane-2a',
          header: 'Step 2:',
          subtitle: 'Access the Marketplace',
          list: [
            {
              title: 'Browse',
              content: 'Use our handy filters to find listings that meet your criteria – by default we show you the businesses near you.'
            },
            {
              title: 'Review',
              content: 'Find a business you’re interested in? Ask for access to the financial information area. Carefully review the basic listing information and term sheet and then evaluate it against your investment goals.'
            },
            {
              title: 'Do your due diligence',
              content: 'Need more information? You can ask any questions you have about the business within the discussion section of each listing.'
            }
          ]
        },
        {
          id: 'pane-3a',
          header: 'Step 3:',
          subtitle: 'Make an Investment',
          list: [
            {
              title: 'Create an offer',
              content: 'When you find a business you’d like to invest in, create an offer. That means you tell the business how much you want to invest, and if you want to accept or propose a different interest rate. Complete the online paperwork and transfer funds to the holding account.'
            },
            {
              title: 'Watch the market',
              content: 'Keep watching the progress of the listing to see how you are doing against competitor bids. You can keep bidding after the listing reaches 100%. You may need to revise your offer to secure the investment of your choice. The status of your offers can be seen in your dashboard.'
            },
            {
              title: 'Enjoy success',
              content: 'Once a listing is completed, investors with offers that are accepted will be notified and the fully executed agreement will be available in the dashboard. (Investors with unsuccessful offers will have their funds returned to their account.)'
            }
          ]
        }
      ];

      vm.$scope.expandCallback = function (index, id) {
        //console.log('expand:', index, id);
      };

      vm.$scope.collapseCallback = function (index, id) {
        //console.log('collapse:', index, id);
      };

      vm.$scope.$on('accordionA:onReady', function () {
        //console.log('accordionA is ready!');
      });
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('InvestController', InvestController);

})();
