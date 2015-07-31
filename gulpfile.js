var requireDir = require('require-dir');

global.gulp    = require('gulp');
global.nconf = require('./config/index')();
global.plugins = require('gulp-load-plugins')();

requireDir('./gulp/tasks', { recurse: true});
requireDir('./gulp/jobs', { recurse: true});
