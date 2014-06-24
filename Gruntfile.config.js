module.exports = {
  
  root_dir: __dirname,
  source_dir: 'src',
  build_dir: '.tmp',
  compile_dir: 'dist',
  bower_dir: 'bower_components',
  node_dir: 'node_modules',
  temp_dir: './src/.tmp/',

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

    js: ['src/{,*/}*.js', '!src/{,*/}*.spec.js', '!src/_entry/*.js'],
    jsunit: ['src/**/*.spec.js'],
  }
};