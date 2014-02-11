'use strict';


var Client = require('svn-spawn');

//Class and Constructor
function SvnServer (url,cb) {
	var tthis = this;
	var client = new Client();
	client.getInfo(url,function(err, info) {
		tthis.info = info;
		cb(err,tthis);
	});
}

// properties and methods
SvnServer.prototype.headRevision = function() {
	return this.info.commit.$.revision;
};

exports.SvnServer = SvnServer;

