module.exports = function(grunt) {

  console.log('Loaded : build.js');

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask('build', [
    'clean',
    'swig:dev',
    'webpackconfig:dev',
    'webpackrequire:dev',
    'webpack:dev',
    'jshint',
    'copy:build_app_assets',
    'modernizr'
  ]);

};