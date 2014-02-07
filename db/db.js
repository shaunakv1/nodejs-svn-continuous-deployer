'use strict';

var Datastore = require('nedb');

//Autoloads the databases. Any commands sent to db before this will be queued up
var Status = new Datastore({ filename: './status.json', autoload: true });
var History = new Datastore({ filename: './history.json', autoload: true });

//Apply Index
Status.ensureIndex({ fieldName: 'repo', unique: true }, function (err) {
    if(err === null ){
        console.log('Applied index on "repo" of Status DB successfully');
    }
    else{
        console.log(err);
    }
});

//TODO:
/*Status.ensureIndex({ fieldName: '', unique: true }, function (err) {
    console.log('Unique constraint violated for "repo" in Status Database \n'+ err);
});*/

//Compress the json every 6 hours
Status.persistence.setAutocompactionInterval(21600000); //6 hours = 21600000 milliseconds
History.persistence.setAutocompactionInterval(21600000); //6 hours = 21600000 milliseconds

//Export the databases
exports.Status = Status;
exports.History = History;