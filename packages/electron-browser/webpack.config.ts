import webpack from 'webpack';
import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';

const paths = {
  src: path.join(__dirname, 'src'),
  main: require.resolve('./src/main'),
};

const port = 3001;
const isDev = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  devtool: isDev ? 'cheap-eval-source-map' : 'source-map',
  mode: isDev ? 'development' : 'production',
  target: 'electron-renderer',
  devServer: {
    port,
    hot: true,
  },
  entry: isDev ? [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    paths.main,
  ] : paths.main,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:7].js',
    chunkFilename: 'chunk~[id].[chunkhash:7].js',
  },
  externals: {
    // electron: 'electron',
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.(t|j)sx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.json$/,
        loader: 'json-loader',
      },
      {
        test: /.(le|c)ss$/,
        exclude: /node_modules/,
        loaders: [
          'less-loader',
          'css-loader',
          'style-loader',
        ],
      },
      {
        test: /.(png|jpe?g|gif|woff2?|ttf)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(paths.src, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

if (isDev) {
  config.plugins!.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

export default config;
