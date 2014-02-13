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
//var passwords = require('../config/passwords.js');

/**
 * [Deployer Constructor]
 * @param {[type]}   project      [description]
 * @param {[type]}   repo         [description]
 * @param {[type]}   deployConfig [description]
 * @param {Function} cb           [description]
 */
function Deployer(project,repo,deployConfig,cb){
     console.log('Deploying '+project.name+' to '+ deployConfig.dev.projectroot );
     cb();
}


exports.Deployer = Deployer;



/*var ssh = new SSH({
    host: 'georati.com',
    user: 'ubuntu',
    port: 22,
    //key: fs.readFileSync('/Users/shaunak/.ssh/georati.pem'),
    key: fs.readFileSync('C:/Users/shaunak.vairagare/Documents/sshkeys/georati.pem'),
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
}*/
