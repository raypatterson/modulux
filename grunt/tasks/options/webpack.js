var DefinePlugin = rekuire('node_modules/webpack/lib/DefinePlugin');
var CommonsChunkPlugin = rekuire('node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var DedupePlugin = rekuire('node_modules/webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = rekuire('node_modules/webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  options: {
    context: '<%= app_files.webpack.context %>',
    entry: '<%= app_files.webpack.entry %>',
    resolve: {
      modulesDirectories: '<%= app_files.webpack.module_dirs %>',
    },
    output: {
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
  },
  dev: {
    output: {
      path: '<%= build_dir %>'
    },
    devtool: 'sourcemap',
    debug: true
  },
  dist: {
    output: {
      path: '<%= compile_dir %>'
    },
    plugins: [
      new DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new DedupePlugin(),
      new UglifyJsPlugin()
    ]
  }
};