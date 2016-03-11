'use strict';

(function() {

class MeterController {
  constructor($state, $scope, $filter) {
    var meter = this;
    meter.$filter = $filter;
    meter.$scope = $scope;

    var value;
    var unit = '';
    var limit = '';

    var data = meter.$scope.meter;

    if(data.type === 'date') {
      var date = new Date(data.value);
      var now = new Date();

      if(data.unit === 'year') {
        var year = date.getFullYear();
        var currentYear = now.getFullYear();

        value = currentYear - year;
      }
    } else if (data.type === 'number') {
      value = data.value;
    }

    var percentage = (value / data.max) * 100;
    var markerNumber = data.labels.length;
    var markers = [];

    angular.forEach(data.labels, function(label, key) {
      var markerPoint = (100 / markerNumber) * key;
      var marker = {
        filled: false,
        value: label
      };

      if(markerPoint <= percentage) {
        marker.filled = true;
      }

      markers.push(marker);
    });

    if(data.unit === '$') {
      value = meter.$filter('currency')(value);
      unit = '$';
      limit = 2;
    }

    meter.$scope.result = {
      percentage: percentage,
      markers: markers,
      label: value + data.suffix,
      unit: unit,
      limit: limit
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('MeterController', MeterController);

})();
