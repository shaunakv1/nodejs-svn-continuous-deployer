'use strict';

var db = require('../db/db.js');
var status = require('../lib/status.js');

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
       status.create("Project A",function () {});
       status.create("Project B",function () {});
       done();
     });

  },

  tearDown: function (done) {
    db.getStatus().remove({ $where: function () { return true; } },{ multi: true },function () {
      db.getStatus().removeIndex('repo',function () {
        done();
      });
    });
  },

  // Unit test cases begin here

  'Create new Status': function(test) {
    test.expect(2);
    // tests here
    status.create("Test project",function (err,newRecord) {
        test.strictEqual(err, null, "Create new status should not throw error");
        test.equal(newRecord.repo, "Test project", "Create new reopsitiry status");
        test.done();
    });
  },

  'Status should unique for a repository name': function(test) {
    test.expect(1);
    status.create("Project A",function (err) {
        test.notStrictEqual(err, null, "Should not allow two statuses with same repo name");
        test.done();
    });
  },

  'Find by repo name': function(test) {
    test.expect(1);
    status.findByRepoName("Project B",function (err, record) {
      test.strictEqual(record.repo,"Project B", "Should find correct repo by its name");
      test.done();
    });
  },

  'Update status with valid arguements':function (test) {
    test.expect(2);

    var updateFields = {
        currRev : 2,
        preRev : 1,
        currDeployLabel : "production",
        preDeployLabel : "development"
      };

    status.update('Project A',updateFields,function (err,numUpdated) {
      test.strictEqual(err, null, "Should not throw error");
      test.strictEqual(numUpdated, 1, "one and just one record should be updated");
      test.done();
    });
  },

  'Update status with null premeters should fail':function (test) {
    test.expect(2);

    var updateFields = {
        currRev : 2,
        preRev : null,
        currDeployLabel : "production",
        preDeployLabel : "development"
      };

    status.update('Project A',updateFields,function (err,numUpdated) {
      test.notStrictEqual(err, null, "Should throw error");
      test.strictEqual(numUpdated, 0, "no record should be updated");
      test.done();
    });
  },

  'Update status with undefined premeters should fail':function (test) {
    test.expect(2);

    var updateFields = {
        currRev : 2,
        preRev : 3,
        //currDeployLabel : "production",
        preDeployLabel : "development"
      };

    status.update('Project A',updateFields,function (err,numUpdated) {
      test.notStrictEqual(err, null, "Should throw error");
      test.strictEqual(numUpdated, 0, "no record should be updated");
      test.done();
    });
  }
};
