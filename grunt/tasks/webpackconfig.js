/**
 *
 * Configures entry points for Webpack from
 *
 */

var _ = require('lodash');
var fs = require('fs-extra');

module.exports = function(grunt) {

  grunt.registerMultiTask('webpackconfig', 'Webpack Config', function() {

    var data = this.data;

    var temp_dir = grunt.config('temp_dir');
    fs.removeSync(temp_dir);

    var arr = grunt.file.expand(data.match);
    var keys = [];

    _.map(arr, function(val, key) {

      key = val.substring(val.lastIndexOf(data.cwd) + data.cwd.length, val.lastIndexOf(data.ext) - 1).replace('data', 'scripts');
      keys.push(key);

    });

    var entry = {};
    var filename;
    var files = grunt.file.expand(data.watch);

    _.each(keys, function(key) {

      filename = temp_dir + key + '.js';

      entry[key] = filename;

      _.each(files, function(file) {

        grunt.file.copy(file, filename);

      });
    });

    grunt.config('app_files.webpack.entry', entry);
  });

};