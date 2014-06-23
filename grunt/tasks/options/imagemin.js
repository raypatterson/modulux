/**
 * Imagemin configuration.
 */
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= compile_dir %>/assets/img',
      src: '{,*/}*.{png,jpg,jpeg}',
      dest: '<%= compile_dir %>/assets/img'
        }]
  }
};