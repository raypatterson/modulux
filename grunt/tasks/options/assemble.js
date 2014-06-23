module.exports = {
  options: {
    engine: 'swig',
    site: './src/',
    data: ['./src/project/pages/*.{json,yml}'],
    partials: ['./src/project/assemble/partials/**/*.html', './src/project/assemble/macros/*.html'],
    layoutdir: './src/project/assemble/layouts',
    layoutext: '.html',
    swig: {
      autoescape: true,
      cache: false,
      locals: {
        get_page_title: function(append) {
          var title = 'Page Title';
          return (append !== undefined) ? title + ' | ' + append : title;
        },
        get_partial_path: function(path) {
          var src = require('grunt').config.get('app_files').swig.src;
          return src + '/partials/' + path + '/partial.html'
        }
      }
    }
  },
  dev: {
    expand: true,
    src: ['./src/**/*.swig'],
    dest: './.tmp/',
    rename: function(dest, src) {
      var filepath = src.split('./src/project/pages/')[1].replace('swig', 'html');
      return dest + filepath;
    }
  }
}