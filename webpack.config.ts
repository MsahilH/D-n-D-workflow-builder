const path = require('path');

module.exports = {
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			pages: path.resolve(__dirname, 'src/pages'),
			layout: path.resolve(__dirname, 'src/layout'),
			assets: path.resolve(__dirname, 'src/assets'),
			store: path.resolve(__dirname, 'src/store'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							icon: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
};
