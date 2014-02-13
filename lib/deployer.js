/*
 * deployer.js
 * https://github.com/shaunakv1/node-svn-deployer
 *
 * Copyright (c) 2014 Shaunak Vairagare
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
//var passwords = require('../config/passwords.js');

exports.awesome = function() {
  return 'awesome';
};

// will have methods that will take a project and path object and manage its deployment to 

/**
 * [deployProject deploys a peoject]
 * @param  {object} project
 * @param  {string} project.path
 * @param  {string} project.url
 * @param  {string} project.name
 * @return {[type]}
 */

exports.deploy = function (project,deployConfig,cb) {
    console.log('Deploying '+project.name+' to '+ deployConfig.dev.projectroot );
    cb();   
};


var SSH = require('simple-ssh');

var ssh = new SSH({
    host: 'georati.com',
    user: 'ubuntu',
    port: 22,
    key: fs.readFileSync('/Users/shaunak/.ssh/georati.pem'),
    baseDir:'/home/ubuntu/deploy-test/'
});

ssh.exec('cd testA', {
    exit: function(code,stdout,stderr) {
        console.log(code); 
        if(code === 1){
            checkout();
            return false;
        }
    }
}).exec('ls && svn update',{
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

function checkout () {
    console.log('executing checkout..');
    ssh.exec('svn checkout https://github.com/shaunakv1/Test-Project-A.git/trunk testA', {
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
}
