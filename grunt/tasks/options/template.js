
module.exports = {
  dev: {
    options: {
      data: {
        'include_ensures': '<%= app_files.webpack.ensure.index %>'
      }
    },
    files: {
      './src/.tmp/*': ['./src/.tmp/*']
    }
  }
};