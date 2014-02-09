'use strict';

/**
 * status model will be used to save the current state of a registered repository
 *
 *  It has following objects:
 *
 * {string} repo  - 'name' of the repo from repos-config.js
 * {Integer} currRev  - latest deployed revision
 * {Integer} preRev   - last deployed revision
 * {String} currDeployLabel - label for server where latest revision was deployed to
 * {String} preDeployLabel - label for server where last revision was deployed to
 */

var db = require('../db/db.js');
var debug = require('../lib/debug.js');

/**
 * Only called once when a new repository is detected in repos-config.js
 * cb - callback function is optional will take arguements: err,newRecord
 */
exports.create = function (nameOfRepo,cb){
  
  var s = {
    repo : nameOfRepo,
    currRev : -1,
    preRev : -1,
    currDeployLabel : "",
    preDeployLabel : "",
  };

  db.getStatus().insert(s, function (err, newRecord) {   // Callback is optional
     var callback = cb || function () {};
     return callback(err,newRecord);
  });
};

exports.update = function (repoName,status,cb){
  
  // var s = {
  //   repo : repoName,
  //   currRev : -1,
  //   preRev : -1,
  //   currDeployLabel : "",
  //   preDeployLabel : "",
  // };

  // db.getStatus().update({ repo: repoName },{ $set: s }, function (err, numReplaced) {
  //   var callback = cb || function () {};
  //    return callback(err,newRecord);
  // });
};

exports.findByRepoName = function (repoName,cb) {
  var s = db.getStatus().findOne({ repo: repoName }, function (err, record) {
    cb(err, record);
  });

};