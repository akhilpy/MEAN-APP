'use strict';

(function() {

class FaqController {

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.allFaqs = [];

    this.Auth = Auth;
    this.isAdmin = Auth.isAdmin;

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
        answer: this.newFaq.answer
      });
      this.newFaq = '';
    }
  }

  deleteFaq(faq) {
    this.$http.delete('/api/faqs/' + faq._id);
  }
}

angular.module('investnextdoorCaApp')
  .controller('FaqController', FaqController);

})();
