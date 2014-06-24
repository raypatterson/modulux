module.exports = function(grunt) {

  global.rekuire = require('rekuire');

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.loadTasks(__dirname + '/grunt/utils');

  var taskConfig = {
    pkg: grunt.file.readJSON(__dirname + '/package.json')
  };

  grunt.util._.extend(taskConfig, grunt.loadOptions(__dirname + '/grunt/tasks/options/'));

  grunt.util._.extend(taskConfig, require(__dirname + '/Gruntfile.config.js'));

  grunt.initConfig(taskConfig);

  grunt.loadTasks(__dirname + '/grunt/tasks');

  grunt.registerTask('default', ['build', 'compile']);

  grunt.loadNpmTasks('grunt-webpack');

};