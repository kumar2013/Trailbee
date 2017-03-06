module.exports = {
  entry: "./index.js",
  output: {
    filename: "dist/bundle.js"
  },
  devServer: {
   inline: true,
   port: 8081
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2016'],
          plugins: ['./babelRelayPlugin'].map(require.resolve)
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
