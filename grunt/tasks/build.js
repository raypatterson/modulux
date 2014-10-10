module.exports = function(grunt) {

  grunt.registerTask('build', [
    'clean',
    'copy:dev',
    'swig:dev',
    'webpackrequire',
    'webpack:dev',
    'jshint'
  ]);

};