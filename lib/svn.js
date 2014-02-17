'use strict';

var Client = require('svn-spawn');
var fs = require('fs');
var debug = require('./debug.js');

//Class and Constructor
function SvnServer (url,cb) {
    var tthis = this;
    tthis.client = new Client({
        silent: true
    });
    
    tthis.client.getLog([url, "-r","HEAD" ],function(err, logs) {
        tthis.info = logs[0];
        cb(err,tthis);
    });

    // svn info gives a little more info but not the log comment. so svn log needs to be issued later anyways
    // tthis.client.getInfo(url,function(err, info) {
    //     tthis.info = info;
    //     cb(err,tthis);
    // });
}

/**
 * [headRevision return current head revision]
 * @return {[type]} [description]
 */
SvnServer.prototype.headRevision = function() {
    return this.info.$.revision;
};

SvnServer.prototype.headRevisionAuthor = function() {
    return this.info.author;
};

SvnServer.prototype.headRevisionMessage = function() {
    return this.info.msg;
};

SvnServer.prototype.headRevisionTimeStamp = function() {
    return this.info.date;
};

/*SvnServer.prototype.headRevisionLog = function(cb) {
    var tthis = this;
    var r = tthis.info.$.revision;
    tthis.client.getLog([tthis.info.url, "-r",""+r ],function(err, log) {
        tthis.log = log;
        cb(err,log);
    });
};*/

/**
 * [exportDeployConfig Exports the deploy.js file in the trunk of the project in the temp]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
SvnServer.prototype.exportDeployConfig = function(project,cb) {
    var filename = './tmp/deploy-'+project.name+'-'+new Date().getTime()+'.json';
    this.client.cmd(['export', project.repoUrl + project.branch +'/deploy.json', filename], function(err,info){
        if(err){
           cb(err);
        }
        else{
            var deployConfig = require('../'+filename);
            deployConfig.destroy = function (){
                fs.unlink(filename, function (err) {
                  if (err) throw err;
                  console.log('successfully deleted'+filename);
                });
            };
            cb(err,deployConfig);
        }
    });
};

exports.SvnServer = SvnServer;


/*new SvnServer("https://github.com/shaunakv1/Test-Project-A.git/trunk",function (err,repo) {
    console.log(repo);
    console.log(repo.headRevision());
});*/

