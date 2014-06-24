module.exports = function(grunt) {

  grunt.registerTask('compile', [
    'clean',
    'swig:dist',
    'htmlmin',
    'webpackconfig',
    'webpackrequire',
    'webpack:dist',
    'jshint'
  ]);

};