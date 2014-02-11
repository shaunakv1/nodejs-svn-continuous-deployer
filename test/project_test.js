'use strict';

var projects = require('../lib/projects.js');

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

exports.projects = {
  setUp: function(done) {
     done();
  },

  tearDown: function (done) {
    done();
  },

  // Unit test cases begin here

  'Get all Projects': function(test) {
    test.expect(5);
    var p = projects.getProjects();
    test.equal((p instanceof Array), true, "Should return a array");
    test.equal((p.length > 0 ) , true, "Should have at least one project");
    test.equal((typeof  p[0].name !== "undefined" &&  p[0].name !== null ),true, "should be defined and not null");
    test.equal((typeof  p[0].repoUrl !== "undefined" &&  p[0].repoUrl !== null ),true, "should be defined and not null");
    test.equal((typeof  p[0].branch !== "undefined" &&  p[0].branch !== null ),true, "should be defined and not null");
    test.done();
  }
};