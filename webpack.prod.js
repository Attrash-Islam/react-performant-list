var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/PerformantScrollableList.tsx',
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
            skipLibCheck: true
          }
        },
        exclude: [
          /node_modules/,
          /dist/
        ] 
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
    }
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
