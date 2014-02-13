'use strict';

var Client = require('svn-spawn');
var fs = require('fs');
var Connection = require('ssh2');
var debug = require('./debug.js');

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

/**
 * [exportDeployConfig Exports the deploy.js file in the trunk of the project in the temp]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
SvnServer.prototype.exportDeployConfig = function(projectName,cb) {
    var filename = './tmp/deploy-'+projectName+'-'+new Date().getTime()+'.json';
    this.client.cmd(['export', this.info.url+'/deploy.json', filename], function(err,info){
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
            }
            cb(err,deployConfig);   
        }
    });
};

exports.SvnServer = SvnServer;


