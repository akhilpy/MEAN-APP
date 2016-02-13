'use strict';

import AWS from 'aws-sdk';

exports.getS3Policy = function(req, res) {
  AWS.config.update({accessKeyId: process.env.AWS_accessKeyId, secretAccessKey: process.env.AWS_secretAccessKey});

  // build folder structure
  var today = new Date();
  var year = today.getFullYear();
  var month = addLeadingChars(today.getMonth() + 1);
  var day = addLeadingChars(today.getDate());
  var fileName = year + '/' + month + '/' + day + '/' + Date.now() + '-' + file.name;

  var s3 = new AWS.S3();
  var s3_params = {
      Bucket: process.env.AWS_bucket,
      Key: fileName,
      ContentType: req.query.mimeType,
      ACL: 'public-read'
  };

  // return typical month and day formats for file structure
  function addLeadingChars(string, nrOfChars, leadingChar) {
    string = string + '';
    return Array(Math.max(0, (nrOfChars || 2) - string.length + 1)).join(leadingChar || '0') + string;
  }

  // create the signed url and return it to the API
  s3.getSignedUrl('putObject', s3_params, function(err, data) {
      if(err) {
        console.log(err);
      }
      else {
        var return_data = {
          signed_request: data,
          url: 'https://' + process.env.AWS_bucket + '.s3.amazonaws.com/' + s3_params.Key
        };
        res.write(JSON.stringify(return_data));
        res.end();
      }
  });
};
