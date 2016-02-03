'use strict';

(function() {

function ApplicationService($location, $cookies, User) {
  var currentUser = {};

  if ($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Application = {


    /**
     * Get application status
     *
     * @return {String}
     */
    getStatus() {
      return 'in-progress';
    },

    /**
     * Get application ID
     *
     * @return {String}
     */
    getID() {
      return '4';
    },

    /**
     * Get application section status
     *
     * @return {String}
     */
    getPageStatus(page) {
      if( page === 'general' ) {
        return 'incomplete';
      } else if( page === 'details' ) {
        return 'fresh';
      } else if( page === 'financial' ) {
        return 'incomplete';
      } else if( page === 'social' ) {
        return 'complete';
      } else if( page === 'terms' ) {
        return 'incomplete';
      }
    }

  };

  return Application;
}

angular.module('investnextdoorCaApp')
  .factory('Application', ApplicationService);

})();
