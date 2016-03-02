'use strict';

(function() {

  class BorrowController {
    constructor($scope) {
      var vm = this;
      vm.$scope = $scope;

      vm.$scope.panesA = [
        {
          id: 'pane-1a',
          header: 'Step 1:',
          subtitle: 'Create a Listing',
          list: [
            {
              title: 'Complete an application',
              content: 'Provide details about your business and the money you want to borrow. This information is secure. You control whether you want to share it with individual investors. Be sure to fill in the form completely. We can’t review your listing application if it’s not complete.'
            },
            {
              title: 'Choose whether it’s a private or marketplace listing*',
              content: 'Select a private listing if you want to control who sees your listing or open it up to all of the investors in our marketplace.'
            },
            {
              title: 'Listing approval',
              content: 'When we complete your listing we will provide a benchmark interest rate for your listing.  You can either choose the rate provided or select an alternative rate.  Note that selecting a lower alternative rate may impact your listing’s success.'
            },
            {
              title: 'Make your listing stand out',
              content: 'Edit your listing to add more information to your listing.  Remember to tell potential investors in our marketplace all about your business, why it’s a great investment and how it will be even more successful with the money requested.  Once you are ready publish your listing.'
            }
          ],
          isExpanded: true
        },
        {
          id: 'pane-2a',
          header: 'Step 2:',
          subtitle: 'Be Proactive',
          list: [
            {
              title: 'Support your listing',
              content: 'If it’s a private listing, make sure you engage with your investor-base early and often. If it’s public, use acceptable methods of communication to ensure your social network gives you the best support possible.'
            },
            {
              title: 'Engage',
              content: 'Potential investors may request access to financial information, or have questions. Be prompt, courteous and forthright. You are accountable for all information you provide. Don’t be shy about highlighting your online presence and providing updates on your business through your discussion page.'
            }
          ]
        },
        {
          id: 'pane-3a',
          header: 'Step 3:',
          subtitle: 'Be a Good Borrower',
          list: [
            {
              title: 'Review offers promptly',
              content: 'Our system shows the offers that give you the best combination of rates and amounts, based on the amount you’re trying to borrow. It’s your decision to accept the offers.'
            },
            {
              title: 'Get your paperwork done',
              content: 'Complete agreements, set up your repayments, and have funds released to you. Once you accept investment offers, you need to file the appropriate forms with the regulators for your province. We’re here to assist you.'
            },
            {
              title: 'Repay funds automatically',
              content: 'Monthly repayments to your investors are automatically withdrawn from your account.'
            },
            {
              title: 'Keep investors engaged',
              content: 'Keep your investors up to date on your progress. They can be great for champions for your business and may be interested in future investments.'
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
    .controller('BorrowController', BorrowController);

})();
