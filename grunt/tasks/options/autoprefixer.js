/**
 * Autoprefixer configuration.
 */
module.exports = {
  options: {
    browsers: ['last 1 version']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= build_dir %>',
      src: '{,*/}*.css',
      dest: '<%= build_dir %>'
    }]
  }
};