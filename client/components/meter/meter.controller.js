'use strict';

(function() {

class MeterController {
  constructor($state, $scope) {
    var meter = this;

    var data = $scope.meter;

    console.log(data);

    if(data.type === 'date') {
      var date = new Date(data.value);
      var now = new Date();

      if(data.unit === 'year') {
        var year = date.getFullYear();
        var currentYear = now.getFullYear();

        var value = currentYear - year;
      }
    }

    var percentage = (value / data.max) * 100;
    var markers = [];

    angular.forEach(data.labels, function(value, key) {
      var markerPoint = (key + 1) * 10;
      var marker = {
        filled: false,
        value: value
      };

      if(markerPoint <= percentage) {
        marker.filled = true;
      }

      markers.push(marker);
    });

    $scope.result = {
      percentage: percentage,
      markers: markers,
      label: value + data.suffix
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('MeterController', MeterController);

})();
