'use strict';

var db = require('../db/db.js');
var status = require('../model/status.js');

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

exports.status = {
  setUp: function(done) {
     db.initializeStatusDB('db/test_status.json',function () {
       done();
     });
     
  },

  tearDown: function (done) {
    db.getStatus().remove({});
    db.getStatus().removeIndex('repo');
    done();
  },

  'Create new Status': function(test) {
    test.expect(2);
    // tests here
    status.createNewStatus("Test project",function (err,newRecord) {
        test.strictEqual(err, null, "Create new status should not throw error");
        test.equal(newRecord.repo, "Test project", "Create new reopsitiry status");
        test.done();
    });
  },

  'Status should unique for a repository name': function(test) {
    test.expect(1);
    
    status.createNewStatus("Test project",function () {
      status.createNewStatus("Test project",function (err) {
          test.notStrictEqual(err, null, "Should not allow two statuses with same repo name");
          test.done();
      });    
    });
  }


};
