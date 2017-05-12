var webpack = require('webpack');
module.exports= {
	entry:{
			app:['./app/app.js','./node_modules/angular'],
		},
	output:{
		path: './bin',
		filename: 'app.bundle.js'
	},
//	 plugins: [
//	           new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
//	       ]
}