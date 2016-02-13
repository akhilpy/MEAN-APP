'use strict';

angular.module('investnextdoorCaApp')
  .controller('MarketplaceController', function ($http, $scope, socket) {

    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.searchListings = '';

    $scope.allListings = [];

    $http.get('/api/listings').success(function(allListings) {
      $scope.allListings = allListings;
      socket.syncUpdates('listing', $scope.allListings);
    });
  });
