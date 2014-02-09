'use strict';

var db = require('./db/db.js');
var debug = require('./lib/debug.js');
var status = require('./model/status.js');

db.initializeStatusDB();
