'use strict';

(function() {

angular.module('investnextdoorCaApp.auth')
  .run(function($rootScope, $state, Auth) {

    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        if(next.authenticate === 'investor' || next.authenticate === 'affiliate') {
          Auth.getCurrentUser(null)
          .then(user => {
            if(user.role === 'investor' || user.role === 'affiliate' || user.role === 'admin') {
              return;
            }
          })
        } else {
          Auth.hasRole(next.authenticate, _.noop).then(has => {
            if (has) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn(_.noop).then(is => {
              $state.go(is ? 'main' : 'login');
            });
          });
        }
      } else {
        Auth.isLoggedIn(_.noop).then(is => {
          if (is) {
            return;
          }

          event.preventDefault();
          $state.go('login');
        });
      }
    });
  });

})();
