'use strict';

var debug = require('./debug.js');
var Client = require('svn-spawn');

/**
 * [isWorkingCopyStale description]
 * @param  {[type]}   path     [description]
 * @param  {Function} callback [description]
 * @return {Boolean}           [description]
 */
exports.isWorkingCopyStale = function (path,callback) {

};

var client = new Client(/*{
    cwd: 'L:/httpd/apps/ccapatlas'
}*/);

// Check the current head revision number
/*client.getInfo("-rHEAD",function(err, data) {
    console.log("Current SVN Head revision:");
    debug.log(data.commit.$.revision);
});

//check the working copy's current revision
client.getInfo(function(err, data) {
    console.log("Current SVN working copy revision:");
    debug.log(data.commit.$.revision);
});*/

// if there is a mismatch, then working copy is stale

// coming up soon....

client.getInfo("https://csc-s-internals.nos.noaa/svn/lca_v3/branches/lca-watersheds",function(err, data) {
    console.log("Current SVN Head revision:");
    debug.log(data);
    /*debug.log(data.commit.$.revision);*/
});


