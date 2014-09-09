module.exports = function(grunt) {

  grunt.registerTask('compile', [
    'clean',
    'copy:dist',
    'swig:dist',
    'htmlmin',
    'webpackconfig',
    'webpackrequire',
    'webpack:dist',
    'jshint'
  ]);

};