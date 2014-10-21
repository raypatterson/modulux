module.exports = {
  options: {
    livereload: true
  },
  gruntfile: {
    files: 'Gruntfile.js',
    tasks: ['jshint:gruntfile'],
    options: {
      livereload: false
    }
  },
  jssrc: {
    files: [
      '<%= app_files.js %>'
    ],
    tasks: ['jshint:src']
  },
  webpack: {
    files: ['<%= app_files.webpack.watch %>'],
    tasks: ['copy:dev', 'swig:dev', 'webpackrequire:dev', 'webpack:dev']
  }
};