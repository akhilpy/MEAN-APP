'use strict';

class FormlyRepeaterCtrl {
  constructor($scope) {
    var unique = 1;

    function copyFields(fields) {
      fields = angular.copy(fields);
      addRandomIds(fields);
      return fields;
    }

    function addNew() {
      $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
      var repeatsection = $scope.model[$scope.options.key];
      var lastSection = repeatsection[repeatsection.length - 1];
      var newsection = {};
      if (lastSection) {
        newsection = angular.copy(lastSection);
      }
      repeatsection.push(newsection);
    }

    function addRandomIds(fields) {
      unique++;
      angular.forEach(fields, function(field, index) {
        console.log(field.fieldGroup);
        if (field.fieldGroup) {
          addRandomIds(field.fieldGroup);
          return; // fieldGroups don't need an ID
        }

        if (field.templateOptions && field.templateOptions.fields) {
          addRandomIds(field.templateOptions.fields);
        }

        field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
      });
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.formOptions = {formState: $scope.formState};
    $scope.addNew = addNew;
    $scope.copyFields = copyFields;
  }
}

angular.module('investnextdoorCaApp')
  .controller('FormlyRepeaterCtrl', FormlyRepeaterCtrl);
