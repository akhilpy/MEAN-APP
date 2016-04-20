'use strict';

class FormlyDropzoneCtrl {
  constructor($scope, $timeout, Dropzone) {
    var vm = this;
    vm.Dropzone = Dropzone;

    $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
    var existingFiles = [];

    var maxFiles = 5;
    if($scope.options.templateOptions.maxFiles) {
      maxFiles = $scope.options.templateOptions.maxFiles;
    }

    $scope.dropzoneConfig = {
      options: vm.Dropzone.getConfig(maxFiles, existingFiles),
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

          $timeout(function() {

            if($scope.model[$scope.options.key].length < maxFiles) {
              $scope.model[$scope.options.key].push(savedFile);
              if($scope.model[$scope.options.key].length === maxFiles) {
                $scope.dropzoneConfig.options.message = 'Maximum files reached';
              } else {
                $scope.dropzoneConfig.options.message = 'Drag and drop files here or click to upload';
              }
            } else {
              $scope.dropzoneConfig.options.message = 'Maximum files reached';
            }

            $scope.$digest();
          });
        },
        maxfilesexceeded: function(file) {
          this.removeFile(file);
          $scope.options.message = 'Maximum files reached';
        },
        maxfilesreached: function(file) {
          $scope.dropzoneConfig.options.message = 'Maximum files reached';
        },
        addedfile : function(file) {
          if($scope.model[$scope.options.key].length < maxFiles) {
            $scope.dropzoneConfig.options.message = 'Uploading';
          }
        },
        removedfile: function(file) {
          var vm = this;

          $timeout(function() {
            this.removeFile(file);
            $scope.$digest();
          });
        }
      }
    };

  }
}

angular.module('investnextdoorCaApp')
  .controller('FormlyDropzoneCtrl', FormlyDropzoneCtrl);
