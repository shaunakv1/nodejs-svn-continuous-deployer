var Client = require('svn-spawn');
var client = new Client({
    cwd: '/path to your svn working directory',
    username: 'username', // optional if authentication not required or is already saved
    password: 'password', // optional if authentication not required or is already saved
});