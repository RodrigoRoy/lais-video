module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: '/lais-video/',
  configureWebpack:{
    devServer: {
      watchOptions: {
        ignored: /public/,
      },
    },
  },
}
