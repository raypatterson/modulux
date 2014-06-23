/**
 * Generates a custom Modernizr build that includes only the tests you
 * reference in your app
 */
module.exports = {
  dist: {
    devFile: '<%= bower_dir %>/modernizr/modernizr.js',
    outputFile: '<%= build_dir %>/modernizr.js',
    files: {
      src: [
          '<%= build_dir %>/{,*/}*.js',
          '<%= build_dir %>/{,*/}*.css',
          '!<%= build_dir %>/{,*/}vendor/{,*/}*.js'
        ]
    },
    uglify: false
  }
};