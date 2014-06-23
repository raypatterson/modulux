var _ = rekuire('lodash');
var fs = rekuire('fs-extra');

module.exports = function(grunt) {

  console.log('Loaded : webpackconfig.js');

  grunt.registerMultiTask('webpackconfig', 'Webpack Config', function() {

    var data = this.data;
    var arr = grunt.file.expand(data.match);
    var files = grunt.file.expand(data.watch);
    var temp_dir = grunt.config('temp_dir');
    var keys = [];
    var entry = {};
    var filename;

    fs.removeSync(temp_dir);

    _.map(arr, function(val, key) {

      key = val.substring(val.lastIndexOf(data.cwd) + data.cwd.length, val.lastIndexOf(data.ext) - 1).replace('data', 'scripts');
      keys.push(key);

    });

    _.each(keys, function(key) {

      filename = temp_dir + key + '.js';

      entry[key] = filename;

      _.each(files, function(file) {

        grunt.file.copy(file, filename);

      });
    });

    console.log('keys', keys);
    console.log('entry', entry);

    grunt.config('app_files.webpack.entry', entry);
  });

};