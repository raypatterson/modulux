/**
 * Rev configuration.
 */
module.exports = {
  files: {
    src: [
      '<%= compile_dir %>/{,*/}*.js',
      '<%= compile_dir %>/{,*/}*.css',
      '<%= compile_dir %>/**/images/**/*.{gif,jpeg,jpg,png,webp}',
      '<%= compile_dir %>/**/fonts/**/*'
      ]
  }
};