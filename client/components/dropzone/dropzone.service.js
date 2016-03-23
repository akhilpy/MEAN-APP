'use strict';

(function() {

function DropzoneService($http) {

  var Dropzone = {

    /**
     * Get Dropzone Config
     *
     * @return {Object}
     */
    getConfig(maxFiles, existingFiles) {
      return {
        url: '#',
        maxFilesize: 100,
        paramName: 'document',
        maxThumbnailFilesize: 5,
        autoProcessQueue: true,
        maxFiles: maxFiles,
        method: 'put',
        message: 'Drag and drop files here or click to upload',
        createImageThumbnails: false,
        init: function() {
          this.on('maxfilesexceeded', function (file) {
            this.removeAllFiles();
            this.addFile(file);
          });
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
        }
      }
    }

  };

  return Dropzone;
}

angular.module('investnextdoorCaApp')
  .factory('Dropzone', DropzoneService);

})();
