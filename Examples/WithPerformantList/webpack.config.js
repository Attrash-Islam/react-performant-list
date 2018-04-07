var webpack = require('webpack');

module.exports = {
	entry: './app.tsx',
	devtool: 'inline-source-map',
	output: {
    filename: 'index.js',
	},
	resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
	module : {
    rules : [
      { 
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            skipLibCheck: false
          }
        },
        exclude: [
          /node_modules/,
          /dist/
        ] 
      }
    ]
  },
  plugins: []
}
