'use strict';

(function() {

class FaqController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.allFaqs = [];

    this.Auth = Auth;
    this.isAdmin = Auth.isAdmin;

    this.categories = [
      {
        label: 'General',
        value: 'General'
      },
      {
        label: 'Business',
        value: 'Business'
      },
      {
        label: 'Investor',
        value: 'Investor'
      }
    ];

    $http.get('/api/faqs').then(response => {
      this.allFaqs = response.data;
      socket.syncUpdates('faq', this.allFaqs);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('faq');
    });
  }

  addFaq() {
    if (this.newFaq) {
      this.$http.post('/api/faqs', {
        question: this.newFaq.question,
        answer: this.newFaq.answer,
        category: this.newFaq.category.value
      });
      this.newFaq = '';
    }
  }

  deleteFaq(faq) {
    this.$http.delete('/api/faqs/' + faq._id);
  }

  filterFAQs(value) {
    console.log(value);
  }
}

angular.module('investnextdoorCaApp')
  .controller('FaqController', FaqController);

})();
