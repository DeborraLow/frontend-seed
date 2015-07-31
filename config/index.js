var nconf = require('nconf');

module.exports = function() {
  // highest priority command line arguments and ENV variables
  nconf.argv().env({seperator: '__'});

  // next highest priority ENV specific settings
  nconf.file('global', {file: "./config/" + process.env.NODE_ENV + ".json"});

  nconf.file('user', {file: "./config/user.json"});

  nconf.file({file: "./config/defaults.json"});

  return nconf;
};
