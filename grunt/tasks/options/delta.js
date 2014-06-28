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
    tasks: ['swig:dev']
  },
  webpackconfig: {
    files: ['<%= app_files.webpackconfig.watch %>'],
    tasks: ['webpackconfig:dev', 'webpackrequire:dev']
  },
  webpack: {
    files: ['<%= app_files.webpack.watch %>'],
    tasks: ['webpackconfig:dev', 'webpackrequire:dev', 'webpack:dev']
  }
};