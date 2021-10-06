const path = require('path');

module.exports = {
  entry: './src/app.js',
  mode: 'development',
	watch: true,

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	
  module: {
    rules: [
			{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },

};