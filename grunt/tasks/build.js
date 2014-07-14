module.exports = function(grunt) {

  grunt.registerTask('build', [
    'clean',
    'copy:dev',
    'swig:dev',
    'webpackconfig',
    'webpackrequire',
    'webpack:dev',
    'jshint'
  ]);

};