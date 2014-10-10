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
  swig: {
    files: ['<%= app_files.swig.watch %>'],
    tasks: ['copy:dev', 'swig:dev', 'webpackrequire:dev', 'webpack:dev']
  },
  webpack: {
    files: ['<%= app_files.webpack.watch %>'],
    tasks: ['copy:dev', 'swig:dev', 'webpackrequire:dev', 'webpack:dev']
  }
};