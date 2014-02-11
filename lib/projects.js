'use strict';

var config = require('../config/repos-config.js');
//var debug = require('../lib/debug.js');
/**
 * This manages all projects using either config or local checkouts.
 */

exports.getProjects = function () {
	return config.REPOSITORIES;
};

exports.getProjetByName = function () {
	return config.REPOSITORIES;
};