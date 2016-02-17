'use strict';

class FormlyDropzoneCtrl {
  constructor($scope, Dropzone) {
    var vm = this;
    vm.Dropzone = Dropzone;

    $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
    var existingFiles = [];

    $scope.dropzoneConfig = {
      options: vm.Dropzone.getConfig(5, existingFiles),
      eventHandlers: {
        error: function(file, response) {
          console.log(response);
        },
        success: function (file, response) {
          var savedFile = {
            name: file.name,
            link: file.downloadUrl,
            size: file.size
          }
          $scope.model[$scope.options.key].push(savedFile);
        },
        maxfilesexceeded: function(file) {
          //alert("No more files please!");
          this.removeFile(file);
        },
        addedfile : function(file) {
          //THIS IS WHERE THE MAGIC HAPPENS! we change the model and
          // tell angular to re-render the form and stuff. NOICE!
          //$scope.$digest();
        }
      }
    };
  }
}

angular.module('investnextdoorCaApp')
  .controller('FormlyDropzoneCtrl', FormlyDropzoneCtrl);
