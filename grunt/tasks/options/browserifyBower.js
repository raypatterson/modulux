/**
 * Bower --> Browserify configuration.
 */
module.exports = {
  build: {
    options: {
      file: '<%= app_files.bower %>',
      forceResolve: {
        'modernizr': 'null',
        'sass-bootstrap': 'null'
      },
      shim: {}
    }
  }
};