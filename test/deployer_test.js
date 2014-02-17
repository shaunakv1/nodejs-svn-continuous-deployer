'use strict';

var Deployer = require('../lib/deployer.js').Deployer;
var servers = require('../config/servers-config.json');
var fs = require('fs');
var SSH = require('simple-ssh');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var project = null;
var deployConfig = null;
var commitMessage = null;

exports.deployer = {
  setUp: function(done) {
     
     project = {
      name: 'Project A',
      repoUrl: 'https://github.com/shaunakv1/Test-Project-A.git/',
      branch: 'trunk/',
      ownerEmail: 'shaunakv1@gmail.com'
     };

     deployConfig = {
        "projectName": "Test Project A",
        "disable": false,
        "stages":["dev","qa","prod"],
        
        "dev" : {
          "projectroot" : "/home/ubuntu/deploy-test/",
          "projectdir": "testB",
          "commitEmail": true,
          "deployEmail":true,
          "emails":["shaunakv1@gmail.com"]
        },
        "qa":{
          "projectroot" : "/home/ubuntu/deploy-test/",
          "projectdir": "testB",
          "commitEmail": true,
          "deployEmail":true,
          "emails":["shaunakv1@gmail.com"]
          },
        "prod":{
          "projectroot" : "/home/ubuntu/deploy-test/",
          "projectdir": "testB",
          "commitEmail": true,
          "deployEmail":true,
          "emails":["shaunakv1@gmail.com"]
        }
      };

     done();
  },

  tearDown: function (done) {
    project = null;
    deployConfig = null;
    commitMessage = null;
    done();
  },

  // Unit test cases begin here
  
  //test ssh connections 
  /*'test server connections': function(test) {
    
    //needed to declare this like this to pass jshint strict check    
    var exitFunction = function(code,stdout,stderr) {
                test.strictEqual(code, 0, "Test pwd on ["+stage+"] server should pass");
                test.done();  
    };

    for (var stage in servers) {
      var server = servers[stage];
      server.baseDir = deployConfig.dev.projectroot;
      server.key = fs.readFileSync(server.keyPath);   
      var ssh = new SSH(server);
      test.expect(1);
      ssh.exec('pwd', {
              exit: exitFunction
          }).start();      
    }
  },*/

  'Donot deploy if disabled': function(test) {
    test.expect(1);
    deployConfig.disable = true;
    var deployer = new Deployer(false);
    test.equal(deployer.pickServerUsingSvnLog(deployConfig,"[dev] sample commit"), false, "Donot deploy if disbled from deploy.js ");
    test.done();
  },

  'Donot deploy if requested stage is not configured in servers-config.js': function(test) {
    test.expect(1);
    var deployer = new Deployer(false);
    test.equal(deployer.pickServerUsingSvnLog(deployConfig,"[blah] sample commit"), false, " [blah] stage Should fail");
    test.done();
  },

  'Return correct server config based on label in comment': function(test) {
    var deployer = new Deployer(false);
    test.expect(servers.length);
    for (var stage in servers) {
      var server = servers[stage];
      var s = deployer.pickServerUsingSvnLog(deployConfig,"["+stage+"] sample commit");
      test.equal(s.host, server.host,"correct server should be returned for stage"+stage);
    }
    test.done();
  }

};