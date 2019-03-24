const path = require('path');

const webpack = require('webpack');

function resolveFromRoot(dir) {
  return path.resolve(__dirname, dir);
}

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const env = process.env.NODE_ENV || DEVELOPMENT;

const isProd = env === PRODUCTION;

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|tvdml\/dist)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
        ],
        cacheDirectory: true,
      },
    },
  },
  {
    test: /\.(png|jpe?g)$/i,
    use: {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash].[ext]',
        publicPath: '/',
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

module.exports = {
  entry: {
    application: resolveFromRoot('./src'),
  },
  output: {
    filename: '[name].js',
    path: resolveFromRoot('./dist'),
    globalObject: 'this', // tvjs doesn't have window object
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  mode: isProd ? 'production' : 'development',
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
