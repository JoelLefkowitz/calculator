module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
      },
      {
        test: /.ts$/,
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
