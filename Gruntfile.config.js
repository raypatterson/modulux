module.exports = {

  root_dir: __dirname,
  source_dir: 'src',
  build_dir: 'build',
  compile_dir: 'dist',
  bower_dir: 'bower_components',
  node_dir: 'node_modules',
  temp_dir: './src/.tmp/',

  app_files: {

    html: ['src/*.html'],

    assets_src: ['./{,*/}fonts/{,*/}*', './{,*/}images/{,*/}*'],

    copy: {
      cwd: './src/',
      src: ['**/*.{jpg,png,gif}']
    },

    swig: {
      watch: ['./src/project/**/*.{swig,json}', './src/project/swig/**/*.html', '!./src/vendor/{,*/}*.*'],
      basepath: __dirname + '',
      pages: {
        cwd: 'src/project/pages/',
        src: ['**/*.swig'],
        ext: '.html',
      },
      partials: {
        src: __dirname + '/src/project/swig/partials/',
        filepath: '/index.html',
        datapath: '/index.json',
      }
    },

    webpackconfig: {
      entry: {
        templates: ['./src/_entry/*.js'],
        match: ['./src/project/pages/**/*.json'],
        cwd: './src/project/pages/',
        ext: 'json'
      }
    },

    webpackrequire: {
      entry: {
        templates: ['./src/_entry/*.js'],
        match: ['./src/project/pages/**/*.json'],
        cwd: './src/project/pages/',
        ext: 'json'
      },
      pages: {
        cwd: 'src/project/pages/',
        match: ['*.{js,scss}'],
        prefix: 'pages/',
      },
      partials: {
        cwd: 'src/project/swig/partials/',
        match: ['*.{js,scss}']
      },
      match: ['src/project/pages/**/*.json'],
      cwd: 'src/project/pages/',
      ext: 'json'
    },

    sass: {
      image_path: '/project/images',
      include_paths: __dirname + '/src/project/' + ', bower_components/'
    },

    webpack: {
      module_dirs: ['../node_modules', '../bower_components', './vendor', './library', './project', './project/swig/partials/'],
      watch: ['./src/**/*.{js,json,scss}', '!./bower_components', '!./node_modules', '!./src/vendor/**/*.*'],
      match: ['./src/*.js', '!./src/*.spec.js'],
      cwd: '.',
      ext: 'js'
    },

    js: ['src/{,*/}*.js', '!src/{,*/}*.spec.js', '!src/_entry/*.js'],
    jsunit: ['src/**/*.spec.js'],
  }
};