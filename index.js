'use strict';

var db = require('./db/db.js');
var debug = require('./lib/debug.js');
var status = require('./model/status.js');
var config = require('./config/repos-config.js');
var projects = require('./model/projects.js');

//start DB
db.initializeStatusDB();

// Sudo code for the deployer:

//Do for each project in config (might change to  check local checkout directory of all projects)
	
	//Check if a project in config has 'status' in DB, if not create one. 

	//Check project's deploy.js that should be checked in with the project in the svn. 

	//Get the svn info for this project

	//if Head Revision of this project is ahead of curRev of status, deploy this repo's latest copy

	//Update the status to reflect the current 


