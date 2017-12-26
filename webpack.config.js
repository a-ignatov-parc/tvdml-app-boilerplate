const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolveFromRoot(dir) {
  return path.resolve(__dirname, dir);
}

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const env = process.env.NODE_ENV || DEVELOPMENT;

const isProd = env === PRODUCTION;

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
        ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
          'react-require',
        ],
        cacheDirectory: true,
      },
    },
  },
];

const stats = {
  modules: false,
  chunks: false,
  colors: true,
};

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: DEVELOPMENT,
  }),
];

if (isProd) {
  plugins.push(...[
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          keep_fnames: true,
          warnings: false,
        },
        output: {
          comments: false,
        },
        mangle: {
          keep_fnames: true,
        },
      },
      sourceMap: true,
    }),
  ]);
}

module.exports = {
  entry: {
    application: resolveFromRoot('./src'),
  },
  output: {
    filename: '[name].js',
    path: resolveFromRoot('./dist'),
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  module: { rules },
  plugins,
  stats,
  devServer: {
    contentBase: resolveFromRoot('./dist'),
    compress: true,
    inline: false,
    port: 9001,
    stats,
  },
};
