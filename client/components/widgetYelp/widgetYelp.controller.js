'use strict';

(function() {

class widgetYelpController {
  constructor($scope, YelpService) {
    var yelp = this;
    yelp.reviews = [];
    yelp.url = $scope.vm.currentListing.social.yelp;

    var yelpArray = yelp.url.split('/');
    var yelpID = yelpArray[yelpArray.length-1];

    YelpService.getReviews(yelpID).then(function(reviews) {
      if( reviews.data.reviews.length > 0 ) {
        yelp.reviews = reviews.data.reviews;
      }
    });
  }
}

angular.module('investnextdoorCaApp')
  .controller('widgetYelpController', widgetYelpController);

})();
