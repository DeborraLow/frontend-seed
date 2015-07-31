/*!
 * Watch Task
 * Watch files and process tasks on change
 *
 * Author: Eric Clifford
 *
 */
 var gulp          = require('gulp'),
     watch         = require('gulp-watch'),
     nconf         = require('nconf');

 gulp.task('watch', [], function() {
   watch(["app/**/*.scss", "!app/vendor/"], function() {
     gulp.start('sass');
   });
   watch(["app/**/*.{json,hbs,yaml}", "!app/vendor/"], function() {
     gulp.start('assemble');
   });
 });
