module.exports = {

  root_dir: __dirname,
  source_dir: 'src',
  build_dir: 'build',
  compile_dir: 'dist',
  bower_dir: 'bower_components',
  node_dir: 'node_modules',
  temp_dir: './src/.tmp/',

  app_files: {

    swig: {
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

    webpack: {
      module_dirs: ['../node_modules', '../bower_components', './vendor', './library', './project', './project/swig/partials/'],
      watch: [
        './src/project/pages/**/*.swig',
        './src/project/swig/partials/**/*.html',
        './src/**/*.{json,js,scss}',
        '!./src/vendor/**/*.*',
        '!./bower_components',
        '!./node_modules'
      ],
      match: ['./src/*.js', '!./src/*.spec.js'],
      cwd: '.',
      ext: 'js'
    },

    sass: {
      image_path: '/images',
      include_paths: __dirname + '/src/project/' + ', bower_components/'
    },

    js: ['src/{,*/}*.js', '!src/{,*/}*.spec.js', '!src/_entry/*.js'],
    jsunit: ['src/**/*.spec.js'],

    copy: {
      cwd: './src/project/',
      src: ['**/*.{jpg,png,gif,svg}']
    },

    assets_src: ['./{,*/}fonts/{,*/}*', './{,*/}images/{,*/}*'],
  }
};