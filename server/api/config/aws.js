'use strict';

import AWS from 'aws-sdk';
import Upload from 's3-uploader';

// return typical month and day formats for file structure
function addLeadingChars(string, nrOfChars, leadingChar) {
  string = string + '';
  return Array(Math.max(0, (nrOfChars || 2) - string.length + 1)).join(leadingChar || '0') + string;
}

// build folder structure
function createPath(fileName) {
  var today = new Date();
  var year = today.getFullYear();
  var month = addLeadingChars(today.getMonth() + 1);
  var day = addLeadingChars(today.getDate());
  return year + '/' + month + '/' + day + '/';
}

exports.getS3Policy = function(req, res) {
  AWS.config.update({accessKeyId: process.env.AWS_accessKeyId, secretAccessKey: process.env.AWS_secretAccessKey});

  var path = createPath();
  var fileName = path + Date.now() + '-' + req.query.fileName;

  var s3 = new AWS.S3();
  var s3_params = {
      Bucket: process.env.AWS_bucket,
      Key: fileName,
      ContentType: req.query.mimeType,
      ACL: 'public-read'
  };

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

exports.uploadToS3 = function(req, res) {
  var path = createPath();
  var client = new Upload(process.env.AWS_bucket, {
    aws: {
      path: path,
      region: process.env.AWS_region,
      acl: 'public-read'
    },

    cleanup: {
      versions: true,
      original: false
    },

    original: {
      awsImageAcl: 'private'
    },

    versions: [{
      maxHeight: 1040,
      maxWidth: 1040,
      format: 'jpg',
      suffix: '-large',
      quality: 80,
      awsImageExpires: 31536000,
      awsImageMaxAge: 31536000
    },{
      maxWidth: 780,
      aspect: '3:2!h',
      suffix: '-medium'
    },{
      maxWidth: 320,
      aspect: '16:9!h',
      suffix: '-small'
    },{
      maxHeight: 100,
      aspect: '1:1',
      format: 'png',
      suffix: '-thumb1'
    },{
      maxHeight: 250,
      maxWidth: 250,
      aspect: '1:1',
      suffix: '-thumb2'
    }]
  });

  console.log(req.body.url);

  client.upload(req.body.url, {}, function(err, versions, meta) {
    console.log(req.body);
    if (err) { throw err; }
    return versions;
  });
};
