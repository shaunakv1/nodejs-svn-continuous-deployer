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
//var config = require('../config/repos-config.js');

exports.setMockDBForTesting = function(status){
  db.Status = status;
};

/**
 * Only called once when a new repository is detected in repos-config.js
 * cb - callback function is optional will take arguements: err,newRecord
 */
exports.createNewStatus = function (nameOfRepo,cb){
  var status = {
    repo : nameOfRepo,
    currRev : -1,
    preRev : -1,
    currDeployLabel : "",
    preDeployLabel : "",
  };

  db.Status.insert(status, function (err, newRecord) {   // Callback is optional
     var callback = cb || function () {};
     debug.log(err);
     return callback(err,newRecord);
  });
};


/*db.Status.insert(document, function (err, newDoc) {   // Callback is optional
  debug.log(newDoc);
});*/