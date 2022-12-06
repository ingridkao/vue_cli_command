const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: process.env.NODE_ENV === 'production'
		? '/vue_cli_command/'
		: '/',
	pages: {
		index: {
			entry: 'src/main.js',
			// 網站title
			title: '茶苑CHAYUAN'
		}
	}
})