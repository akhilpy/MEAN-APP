'use strict';

(function() {

function DropzoneService($http) {

  var Dropzone = {

    /**
     * Get Dropzone Config
     *
     * @return {Object}
     */
    getConfig( maxFiles, existingFiles ) {
      return {
        url: '#',
        maxFilesize: 100,
        paramName: 'document',
        maxThumbnailFilesize: 5,
        autoProcessQueue: true,
        maxFiles: maxFiles,
        method: 'put',
        init: function() {
          this.on('maxfilesexceeded', function (file) {
            this.removeAllFiles();
            this.addFile(file);
          });
          for (var i = 0; i < existingFiles.length; i++) {
            var existingFile = existingFiles[i];
            this.emit('addedfile', existingFile);
            this.emit('thumbnail', existingFile, existingFile.link);
            this.emit('complete', existingFile);
          }
          var existingFileCount = i + 1;
          this.options.maxFiles = this.options.maxFiles - existingFileCount;
        },
        accept: function( file, done ) {
          $http.get('/api/s3Policy?mimeType=' + file.type + '&fileName=' + file.name).then(function(response) {
            file.uploadUrl = response.data.signed_request;
            file.downloadUrl = response.data.url;
            done();
          }, function() {
            console.log('could not create signed url');
            done();
          });
        },
        processing: function( file ) {
          // change url before sending
          this.options.url = file.uploadUrl;
        },
        sending: function (file, xhr, formData) {
          var _send = xhr.send;
          xhr.send = function() {
            _send.call(xhr, file);
          };
        },
      }
    }

  };

  return Dropzone;
}

angular.module('investnextdoorCaApp')
  .factory('Dropzone', DropzoneService);

})();
