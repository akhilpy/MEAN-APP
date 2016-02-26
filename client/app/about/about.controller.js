'use strict';

(function() {

  class AboutController {
    constructor($scope, TeamService) {
      var vm = this;

      vm.teamMembers = TeamService.getTeam();
      vm.teamAdvisors = TeamService.getAdvisors();
    }
  }

  angular.module('investnextdoorCaApp')
    .controller('AboutController', AboutController);

})();
