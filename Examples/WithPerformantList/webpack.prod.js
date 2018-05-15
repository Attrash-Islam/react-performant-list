var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './app.tsx',
	devtool: 'inline-source-map',
	output: {
    filename: 'dist/index.js',
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
  plugins: [
    new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
  ]
}
