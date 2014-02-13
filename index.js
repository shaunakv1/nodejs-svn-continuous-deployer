'use strict';

var db = require('./db/db.js');
var debug = require('./lib/debug.js');
var Status = require('./lib/status.js');
var projects = require('./lib/projects.js');
var SvnServer = require('./lib/svn').SvnServer;
var und = require('underscore');
var notifications = require('./lib/notifications');
var deployer = require('./lib/deployer.js');

//start DB
db.initializeStatusDB();

// Sudo code for the deployer:

//Do for each project in config (might change to  check local checkout directory of all projects)
	und.each(projects.all(),function (project) {
		//Check if a project in config has 'status' in DB, if not create one.
		Status.create(project.name, function (err) {

			if(!!err) console.log('Status for - '+ project.name+'- exists..' );
			else console.log('Status for - '+ project.name+'- created..' );

			
			//TODO:  Get the svn info for this project
			var svn = new SvnServer(project.repoUrl+project.branch,function(err,repo){
				console.log('Project Head Revision:'+ repo.headRevision());
				var repoHeadRevision = repo.headRevision();
				Status.findByRepoName(project.name,function (err,status) {
					//debug.log(repo);
					//TODO:  if Head Revision of this project is ahead of curRev of status
					if(status.currRev < repoHeadRevision){
						console.log(project.name+' needs to be deployed..');
						//TODO:  Check project's deploy.js that should be checked in with the project in the svn.
						svn.exportDeployConfig(project.name,function(err,deployConfig){
							//if error notify project owner as deploy config missing
							 if(err) notifications.deployConfigMissing(project,err.message);
							 else{
							 	//deploy this repo's latest copy
								deployer.deploy(project,deployConfig,function () {
									deployConfig.destroy();
								});
							 }
						});
						//TODO:  Update the status to reflect the current
					}
				});
			});
			
			
		});
	});







