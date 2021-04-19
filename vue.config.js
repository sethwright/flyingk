module.exports = {
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9010",
        secure: false,
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
