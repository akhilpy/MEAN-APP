'use strict';

(function() {

class FaqController {

  constructor($http, $scope, $filter, socket, Auth, ListingService) {
    var vm = this;
    vm.$http = $http;
    vm.$filter = $filter;
    vm.allFaqs = [];
    vm.faqs = [];

    vm.Auth = Auth;
    vm.isAdmin = Auth.isAdmin;
    vm.searchTerm = '';
    vm.category = '';

    vm.categories = [
      {label: 'General', value: 'General'},
      {label: 'Business', value: 'Business'},
      {label: 'Investor', value: 'Investor'}
    ];

    $http.get('/api/faqs').then(response => {
      vm.faqs = vm.$filter('orderBy')(response.data, 'order');
      vm.allFaqs = vm.faqs;
      socket.syncUpdates('faq', vm.allFaqs);
    });

    $scope.sortableOptions = {
      stop: function(e, ui) {
        vm.updateOrder(vm.allFaqs);
      }
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('faq');
    });

    $scope.$watch('vm.searchTerm', function(val) {
      vm.allFaqs = vm.$filter('filter')(vm.faqs, val);
    });

    $scope.$watch('vm.category', function(val) {
      vm.allFaqs = vm.$filter('filter')(vm.faqs, {category: val});
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

  updateFaq(faq) {
    this.$http.put('/api/faqs/' + faq._id, faq).then(() => {
      console.log(faq);
    });
  }

  updateOrder(faqs) {
    var vm = this;
    angular.forEach(faqs, function(faq, key) {
      faq.order = key;
      vm.updateFaq(faq);
    });
  }

  deleteFaq(faq) {
    this.$http.delete('/api/faqs/' + faq._id);
  }
}

angular.module('investnextdoorCaApp')
  .controller('FaqController', FaqController);

})();
