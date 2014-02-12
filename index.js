'use strict';

var db = require('./db/db.js');
var debug = require('./lib/debug.js');
var Status = require('./lib/status.js');
var projects = require('./lib/projects.js');
var SvnServer = require('./lib/svn').SvnServer;
var und = require('underscore');

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
			new SvnServer(project.repoUrl+project.branch,function(err,repo){
				console.log('Project Head Revision:'+ repo.headRevision());
				var repoHeadRevision = repo.headRevision();
				Status.findByRepoName(project.name,function (err,status) {
					//TODO:  if Head Revision of this project is ahead of curRev of status, deploy this repo's latest copy
					if(status.currRev < repoHeadRevision){
						console.log(project.name+' needs to be deployed..');
						//TODO:  Check project's deploy.js that should be checked in with the project in the svn.
						
						//TODO:  Update the status to reflect the current
					}
				});
			});
			
			
		});
	});







