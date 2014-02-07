'use strict';

var status_model = require('../model/status.js');
var Datastore = require('nedb');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.status_model = {
  setUp: function(done) {
    //setting up mock db and assigning mock Status to status_model
    var Status = new Datastore({ filename: './test.json', autoload: false });
    Status.loadDatabase(function (err) {
      if(err===null){
        Status.ensureIndex({ fieldName: 'repo', unique: true }, function (err) {
            if(err === null ){
              status_model.setMockDBForTesting(Status);
              done();
            }
        });
      }
    });
     done();
  },

  'Create new Status': function(test) {
    test.expect(2);
    // tests here
    status_model.createNewStatus("Test project",function (err,newRecord) {
        test.notStrictEqual(err, null, "Create new status should not throw error");
        if(err !== null){
          test.equal(newRecord.repo,"Test project","New recored should be created with correct repo name");
          test.done();
        }
    });
  }
};
