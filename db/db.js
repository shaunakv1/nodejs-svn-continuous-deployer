'use strict';

var Datastore = require('nedb');
var Status = null;
var History = null;

/**
 * [initialize initialize database]
 * @param  {string} statusDB optional path to status DB file (for unit testing?).
 * @param {function} cb callback is optional
 * @return {null}
 */
exports.initializeStatusDB = function (statusDB,cb) {
	statusDB = statusDB || './status.json';
		
	//Autoloads the databases. Any commands sent to db before this will be queued up
	Status = new Datastore({ filename: statusDB, autoload: true });
	
	//report database loaded
	Status.loadDatabase(function (err) {
  		cb = cb || function () {};
		cb(err,Status);
	});
	
	//Apply Index
	Status.ensureIndex({ fieldName: 'repo', unique: true }, function (err) {
	    if(err !== null ) console.log(err);
	});

	//Compress the json every 6 hours
	Status.persistence.setAutocompactionInterval(21600000); //6 hours = 21600000 milliseconds
};

exports.initializeHistoryDB = function (historyDB,cb) {
	historyDB = historyDB || './history.json';
	
	//Autoloads the databases. Any commands sent to db before this will be queued up
	History = new Datastore({ filename: historyDB, autoload: true });

	//report database loaded 
	History.loadDatabase(function (err) {
  		cb = cb || function () {};
		cb(err,History);
	});
	
	//TODO:
	/*Status.ensureIndex({ fieldName: '', unique: true }, function (err) {
	    console.log('Unique constraint violated for "repo" in Status Database \n'+ err);
	});*/

	//Compress the json every 6 hours
	History.persistence.setAutocompactionInterval(21600000); //6 hours = 21600000 milliseconds	
};

exports.getStatus = function () {
	return Status;
};

exports.getHistory = function () {
	return History;
};