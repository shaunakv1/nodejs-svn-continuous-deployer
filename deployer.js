var debug = require('./lib/debug.js');
var Client = require('svn-spawn');

var client = new Client({
    cwd: 'L:/httpd/apps/ccapatlas'
});

// Check the current head revision number
client.getInfo("-rHEAD",function(err, data) {
    console.log("Current SVN Head revision:");
    debug.log(data.commit.$.revision);
});

//check the working copy's current revision
client.getInfo(function(err, data) {
    console.log("Current SVN working copy revision:");
    debug.log(data.commit.$.revision);
});

// if there is a mismatch, then working copy is stale

// coming up soon...




