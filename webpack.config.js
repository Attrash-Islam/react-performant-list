var webpack = require('webpack');

module.exports = {
	entry: './src/PerformantScrollableList.tsx',
	devtool: 'inline-source-map',
	output: {
    filename: 'dist/index.debug.js',
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
  plugins: []
}
