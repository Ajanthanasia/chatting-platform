const nconf = require('nconf');
const path = require('path');

nconf.env();
nconf.defaults({
    port: 4245,
    hostname: 'localhost',
    mode: 'development'
  }); 
module.exports = nconf;
