var CommonsChunkPlugin = rekuire('node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var DedupePlugin = rekuire('node_modules/webpack/lib/optimize/DedupePlugin');

module.exports = {
  dev: {
    context: '<%= app_files.webpack.context %>',
    entry: '<%= app_files.webpack.entry %>',
    resolve: {
      modulesDirectories: '<%= app_files.webpack.module_dirs %>',
    },
    output: {
      path: '<%= build_dir %>',
      filename: '[name].js',
      chunkFilename: '[chunkhash].[id].chunk.js'
    },
    plugins: [
      new CommonsChunkPlugin('commons.js')
    ],
    module: {
      loaders: [
        { 
          test: /\.scss$/, 
          loader: 'style!css!sass?outputStyle=expanded!autoprefixer-loader' 
        }, { 
          test: /\.json$/, 
          loader: 'json' 
        }
      ]
    },
    devtool: 'sourcemap',
    debug: true
  }
};