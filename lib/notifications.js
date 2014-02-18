'use strict';

exports.deployConfigMissing = function (project,msg,cb) {
	console.log('Email '+project.ownerEmail + ': '+ msg );
};

exports.newCommit = function (project,deployConfig,msg,cb) {
	console.log('Email '+project.ownerEmail + ': '+ msg );
};

exports.newDeploy = function (project,deployConfig,msg,cb) {
	console.log('Email '+project.ownerEmail + ': '+ msg );
};

exports.deployFailed = function (project,msg,cb) {
	console.log('Email Deploy Failed'+project.ownerEmail + ': '+ msg );
};