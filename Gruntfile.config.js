/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  root_dir: __dirname,
  source_dir: 'src',
  build_dir: '.tmp',
  compile_dir: 'dist',
  bower_dir: 'bower_components',
  node_dir: 'node_modules',
  temp_dir: './src/.tmp/',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`).
   */
  app_files: {

    html: ['src/*.html'],

    assets_src: ['./{,*/}fonts/{,*/}*', './{,*/}images/{,*/}*'],

    swig: {
      watch: ['./src/{,*/}*.{swig,json}', './src/**/swig/**/*.html', '!./src/vendor/{,*/}*.*'],
      basepath: __dirname,
      pages: {
        cwd: './src/project/pages/',
        src: ['**/*.swig'],
        ext: '.html',
      },
      partials: {
        src: __dirname + '/src/project/swig/partials/',
        filepath: '/partial.html'
      }
    },

    webpackconfig: {
      watch: ['./src/_entry/*.js'],
      match: ['./src/project/pages/**/*.json'],
      cwd: './src/project/pages/',
      ext: 'json'
    },

    webpackrequire: {
      watch: ['./src/_entry/*.js'],
      match: ['./src/project/pages/**/*.json'],
      cwd: './src/project/pages/',
      ext: 'json'
    },

    webpack: {
      context: './',
      module_dirs: ['../node_modules', '../bower_components', './vendor', './library', './project', './project/swig/partials/'],
      watch: ['./src/{,*/}*.{js,json,scss}', '!./src/vendor/{,*/}*.*'],
      match: ['./src/*.js', '!./src/*.spec.js'],
      cwd: './src/',
      ext: 'js'
    },

    // replace: {
    //   src: ['./src/.tmp/*'],
    //   dest: './src/.tmp/',
    //   rename: function(dest, src) {
    //     return dest + src + '.js';
    //   }
    // },

    favicons: {
      src: 'src/project/images/favicons/__FAVICON_SOURCE__.png',
      dest: 'dist/project/images/favicons',
      html: 'dist/index.html',
      path: 'project/images/favicons/',
    },

    tpl: ['src/{,*/}*.tpl.html'],

    bower: '.tmp/bower.js',

    js: ['src/{,*/}*.js', '!src/{,*/}*.spec.js', '!src/_entry/*.js'],
    jsunit: ['src/**/*.spec.js'],

    coffee: ['src/{,*/}*.coffee', '!src/{,*/}*.spec.coffee'],
    coffeeunit: ['src/{,*/}*.spec.coffee'],

    sass: {
      specify_src: 'main',
      specify_dist: 'main',
      css_dir: '.tmp',
      fonts_dir: '',
      images_dir: '',
      import_path: ['src', 'bower_components'],
    }
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: []
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project src files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [],
    css: [],
    assets: []
  },
};