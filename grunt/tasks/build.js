module.exports = function(grunt) {

  grunt.registerTask('build', [
    'clean',
    'swig:dev',
    'webpackconfig',
    'webpackrequire',
    'webpack:dev',
    'jshint'
  ]);

};