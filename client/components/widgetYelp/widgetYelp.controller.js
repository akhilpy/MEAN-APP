'use strict';

(function() {

class widgetYelpController {
  constructor($scope, YelpService) {
    var yelp = this;
    yelp.overview = {};
    yelp.reviews = [];
    yelp.entered = false;
    yelp.url = $scope.vm.currentListing.social.yelp;

    if(yelp.url && yelp.url.length > 0) {
      yelp.entered = true;
      var yelpArray = yelp.url.split('/');
      var yelpID = yelpArray[yelpArray.length-1];

      YelpService.getBusiness(yelpID).then(function(reponse) {
        yelp.overview = {
          image: reponse.data.image_url,
          name: reponse.data.name,
          rating: reponse.data.rating,
          rating_image: reponse.data.rating_img_url,
          location: reponse.data.location
        }

        if( reponse.data.reviews.length > 0 ) {
          yelp.reviews = reponse.data.reviews;
        }
      });
    }

  }
}

angular.module('investnextdoorCaApp')
  .controller('widgetYelpController', widgetYelpController);

})();
