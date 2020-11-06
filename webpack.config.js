require('dotenv/config');
const path = require('path');

const clientPath = path.join(__dirname, 'client/');
const publicPath = path.join(__dirname, 'server/public/');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: clientPath,
  output: {
    path: publicPath
  },

  module: {
    rules: [
      {
        test: /\.jsx/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.s?(c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.s?(c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts/'
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    },
    stats: 'minimal',
    watchContentBase: true
  }
};
