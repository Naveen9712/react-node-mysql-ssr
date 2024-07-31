const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: './src/index.js', // Client-side entry point
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'client.bundle.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/, // Add this rule
          use: ['style-loader', 'css-loader'], // Loaders for CSS
        },
      ],
    },
  },
  {
    entry: './src/App.js', // Server-side entry point (or an SSR entry point)
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/, // Add this rule
          use: ['style-loader', 'css-loader'], // Loaders for CSS
        },
      ],
    },
  },
];
