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
//var debug = require('../lib/debug.js');

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

/**
 * [update updates record]
 * @param  {string}   repoName
 * @param  {object}  newStatus object with parameteters to update. All params must be defined. 
 * @param  {integer} newStatus.currRev 
 * @param  {integer} newStatus.prevRev 
 * @param  {string}  newStatus.currDeployLabel 
 * @param  {string}  newStatus.preDeployLabel
 * @param  {Function} cb callback once update is done. Takes err and numReplaced params. 
 * @return {null}
 */

exports.update = function (repoName,newStatus,cb){  
  //create a new update object from the received object so it can be validated and avoid injection
  var updateFields = {
        currRev : newStatus.currRev,
        preRev : newStatus.preRev,
        currDeployLabel : newStatus.currDeployLabel,
        preDeployLabel : newStatus.preDeployLabel,
      };
  
  //first check if all fields are defined and or not null else scream! 
  for (var property in updateFields) {
      if (typeof updateFields[property] === "undefined" || updateFields[property] === null ) {
        return cb({"message": property+ "needs to be set. It is null or undefined"}, 0);    
      }
  }
  
  //now run the update on database    
  db.getStatus().update({ repo: repoName },{ $set: updateFields }, function (err, numReplaced) {
    var callback = cb || function () {};
     return callback(err,numReplaced);
  });
};

/**
 * [findByRepoName Find the states of a repository using its name]
 * @param  {string}   repoName
 * @param  {Function} cb Callback to receive the found record. takes err and record parameters. 
 * @return {null}
 */

exports.findByRepoName = function (repoName,cb) {
  db.getStatus().findOne({ repo: repoName }, function (err, status) {
    cb(err, status);
  });
};