'use strict';

var config = require('../config/repos-config.js');
var und = require('underscore');

//var debug = require('../lib/debug.js');
/**
 * This manages all projects using either config or local checkouts.
 */

exports.all = function () {
	return config.REPOSITORIES;
};

exports.getProjetByName = function (projectName) {
	return und.find(this.getProjects(), function(o){
		return o.name === projectName;
	});
};