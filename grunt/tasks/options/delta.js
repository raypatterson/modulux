/**
 * And for rapid development, we have a watch set up that checks to see if
 * any of the files listed below change, and then to execute the listed
 * tasks when they do. This just saves us from having to type "grunt" into
 * the command-line every time we want to see what we're working on; we can
 * instead just leave "grunt watch" running in a background terminal. Set it
 * and forget it, as Ron Popeil used to tell us.
 *
 * But we don't need the same thing to happen for all the files.
 */
module.exports = {
  /**
   * By default, we want the Live Reload to work for all tasks; this is
   * overridden in some tasks (like this file) where browser resources are
   * unaffected. It runs by default on port 35729, which your browser
   * plugin should auto-detect.
   */
  options: {
    livereload: true
  },

  /**
   * When the Gruntfile changes, we just want to lint it. In fact, when
   * your Gruntfile changes, it will automatically be reloaded!
   */
  gruntfile: {
    files: 'Gruntfile.js',
    tasks: ['jshint:gruntfile'],
    options: {
      livereload: false
    }
  },

  /**
   * When our JavaScript source files change, we want to run lint them and
   * run our unit tests.
   */
  jssrc: {
    files: [
      '<%= app_files.js %>'
    ],
    tasks: ['jshint:src', 'modernizr']
    // tasks: ['jshint:src', 'browserifyBower:build:nowrite', 'browserify:build', 'modernizr']
    // tasks: ['jshint:src', 'karma:unit:run', 'copy:build_appjs']
  },

  /**
   * When our CoffeeScript source files change, we want to run lint them and
   * run our unit tests.
   */
  coffeesrc: {
    files: [
      '<%= app_files.coffee %>'
    ],
    tasks: ['coffeelint:src', 'modernizr']
    // tasks: ['coffeelint:src', 'coffee:source', 'browserifyBower:build:nowrite', 'browserify:build', 'modernizr']
    // tasks: ['coffeelint:src', 'coffee:source', 'karma:unit:run', 'copy:build_appjs']
  },

  /**
   * When assets are changed, copy them. Note that this will *not* copy new
   * files, so this is probably not very useful.
   */
  assets: {
    files: '<%= app_files.assets_src %>',
    tasks: ['copy:build_assets']
  },

  /**
   * When index.html changes, we need to compile it.
   */
  // html: {
  //   files: ['<%= app_files.html %>'],
  //   tasks: ['index:build']
  // },

  /**
   * When Swig files change, we need to compile them.
   */
  swig: {
    files: ['<%= app_files.swig.watch %>'],
    tasks: ['swig:dev']
  },

  /**
   * When Entry files change, we need to compile them.
   */
  webpackconfig: {
    files: ['<%= app_files.webpackconfig.watch %>'],
    tasks: ['webpackconfig:dev', 'webpackrequire:dev']
  },

  /**
   * When Webpack files change, we need to compile them.
   */
  webpack: {
    files: ['<%= app_files.webpack.watch %>'],
    tasks: ['webpack:dev']
  },

  /**
   * When our templates change, we only rewrite the template cache.
   */
  // tpls: {
  //   files: [
  //         '<%= app_files.tpl %>'
  //       ],
  //   tasks: ['html2js']
  // },

  /**
   * When the CSS files change, we need to compile and minify them.
   */
  // sass: {
  //   files: ['src/**/*.scss'],
  //   tasks: ['compass:build', 'autoprefixer', 'modernizr']
  // },

  /**
   * When a JavaScript unit test file changes, we only want to lint it and
   * run the unit tests. We don't want to do any live reloading.
   */
  jsunit: {
    files: [
      '<%= app_files.jsunit %>'
    ],
    tasks: ['jshint:test'],
    // tasks: ['jshint:test', 'karma:unit:run'],
    options: {
      livereload: false
    }
  },

  /**
   * When a CoffeeScript unit test file changes, we only want to lint it and
   * run the unit tests. We don't want to do any live reloading.
   */
  coffeeunit: {
    files: [
      '<%= app_files.coffeeunit %>'
    ],
    tasks: ['coffeelint:test'],
    // tasks: ['coffeelint:test', 'karma:unit:run'],
    options: {
      livereload: false
    }
  }
};