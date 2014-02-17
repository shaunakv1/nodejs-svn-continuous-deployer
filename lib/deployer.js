/*
 * deployer.js
 * https://github.com/shaunakv1/node-svn-deployer
 *
 * Will have methods that will take a project and path object and manage its deployment to
 *
 * Copyright (c) 2014 Shaunak Vairagare
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var SSH = require('simple-ssh');
var servers = require('../config/servers-config.json');
var und = require('underscore');

//var passwords = require('../config/passwords.js');

//for windows change in config
//"key": "C:/Users/shaunak.vairagare/Documents/sshkeys/georati.pem"

/**
 * [Deployer Constructor]
 * @param {bolean}   isTest      used for unit testing. Should always pass true,except when you know what you are doing :)
 * @param {object}   project      project object from repos-config.js
 * @param {object}   svn          object representing svn log of this repo (object of class lib/svn.js)
 * @param {object}   deployConfig object from deploy.js committed with each project
 * @param {Function} cb           callback when constructer is ready
 */

function Deployer(isTest,project,svn,deployConfig,cb){
     this.isTest = isTest; // used to disable certain features for unit testing
     if(isTest){
        console.log('Deploying '+project.name+' to '+ deployConfig.dev.projectroot );
        var server = this.pickServerUsingSvnLog(deployConfig, svn.headRevisionMessage());
        if(server){
           this.ssh = new SSH(server);
           //deploy required, callback with deployer object
           cb(this);   
        }
        else {
            //deploy not required   
            cb(null);   
        }   
     }
}

/**
 * [pickServerUsingSvnLog will read the svn log, and figure out if deployment is needed and if yes, on which server]
 * @param  {object} deployConfig   The object of deploy.js file saved with every project
 * @param  {string} commitMessage  The svn message saved with last commit made by the user
 * @return {boolean/object} Returns false if no deployment needed else returns server config object for ssh 
 */

Deployer.prototype.pickServerUsingSvnLog = function(deployConfig,commitMessage) {
    
    if(deployConfig.disable) return false;

    //check if any of the stage labels in the deploy.js exist in commit message in form  of [dev] or [qa].
    //also check if stage requested is configured in servers-config.js
     for (var i in deployConfig.stages){
        var stage = deployConfig.stages[i];
        if(servers.hasOwnProperty(stage) && new RegExp("\\["+stage+"\\]","gi").test(commitMessage)){
            var server = servers[stage]; 
            server.baseDir = deployConfig[stage].projectroot;
            if(this.isTest) server.key = fs.readFileSync(server.keyPath);
            return server; 
        }
    }
    return false;
};

Deployer.prototype.deploy = function() {
    this.ssh.exec('cd testA', {
        exit: function(code,stdout,stderr) {            
            if(code === 1){ // means project directory does not exist
                // create directory and makea fresh checkout in it
                this.checkout();
                return false;
            }
        }
    }).exec('cd testA && svn update',{ //else get into the directory and execute update
        out: function(stdout) {
            console.log(stdout);
        },
        err: function(stderr) {
            console.log(stderr);
        },
        exit: function(code,stdout,stderr) {
            console.log(code);
            if(code === 1){
                return false;
            }
        }
    }).start();
};

Deployer.prototype.checkout = function () {
    console.log('executing checkout..');
    this.ssh.exec('svn checkout https://github.com/shaunakv1/Test-Project-A.git/trunk testA', {
        out: function(stdout) {
            console.log(stdout);
        },
        err: function(stderr) {
            console.log(stderr);
        },
        exit: function(code,stdout,stderr) {
            console.log(code);
            if(code === 1){
                return false;
            }
        }
    });
};

exports.Deployer = Deployer;
