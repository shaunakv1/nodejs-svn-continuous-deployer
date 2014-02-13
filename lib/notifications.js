'use strict';

exports.deployConfigMissing = function (project,msg,cb) {
	console.log('Email '+project.ownerEmail + ': '+ msg );
};