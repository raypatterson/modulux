module.exports = function(grunt) {

  console.log('Loaded : compile.js');

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask('compile', [
    'compass:compile',
    'copy:compile_assets',
    'useminPrepare',
    'concat:compile_js',
    'uglify',
    'index:compile',
    'imagemin',
    'rev',
    'usemin',
    'favicons',
    'htmlmin'
  ]);

};