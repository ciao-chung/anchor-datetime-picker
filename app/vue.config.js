const path = require('path')
const packageJson = require('./package.json')
const webpack = require('webpack')
const version = packageJson.version
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    workboxOptions: {
      exclude: [/.svg$/, /.map$/]
    },
  },
  // github page
  publicPath: process.env.NODE_ENV === 'production' ? `/${packageJson.projectCode}/` : '/',
  configureWebpack: config => {
    // production設定
    if(process.env.NODE_ENV === 'production'){
      config.output.libraryExport = 'default'
      config.output.libraryTarget = 'umd'
      config.output.filename = `${packageJson.name}.js`
      delete config.output.chunkFilename
    }

    config.resolve.modules = [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'modules'),
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'node_modules/@vue/cli-service/node_modules'),
    ]
  },
  chainWebpack: config => {
    config
      .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [{
        PROJECT_CODE: JSON.stringify(packageJson.projectCode),
        PROJECT_NAME: JSON.stringify(packageJson.projectName),
      }])
  },
}