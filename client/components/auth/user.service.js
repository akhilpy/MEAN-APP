'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        userController: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    getOne: {
      method: 'GET',
      params: {
        id: '@_id'
      }
    },
    role: {
      method: 'GET',
      isArray: true,
      url: '/api/users/role/:role',
      params: {
        role: '@_role'
      }
    }
  });
}

angular.module('investnextdoorCaApp.auth')
  .factory('User', UserResource);

})();
