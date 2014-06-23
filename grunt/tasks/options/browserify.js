/**
 * Browserify configuration.
 */
module.exports = {
  build: {
    files: {
      '<%= build_dir %>/main.js': ['<%= app_files.js %>']
    }
  }
};