'use strict';

var Client = require('svn-spawn');
//var debug = require('./debug.js');

//Class and Constructor
function SvnServer (url,cb) {
    var tthis = this;
    tthis.client = new Client({});
    tthis.client.getInfo(url,function(err, info) {
        tthis.info = info;
        cb(err,tthis);
    });
}

//methods
SvnServer.prototype.headRevision = function() {
    return this.info.commit.$.revision;
};

//methods
SvnServer.prototype.exportDeployConfig = function(cb) {
    this.client.cmd(["export", this.info.url+"/trunk/deploy.js", "./tmp/deploy.js"], function(err,info){
        cb(err,info);
    });
};

exports.SvnServer = SvnServer;

// var s = new SvnServer('https://github.com/shaunakv1/Test-Project-A.git',function (err, info) {
//  // debug.log(err);
//  // debug.log(info);
//  s.exportDeployConfig();
// });

