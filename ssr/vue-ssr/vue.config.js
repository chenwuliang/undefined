// vue.config.js

const merge = require("lodash.merge");
const client = require("./webpack.client.config");
const server = require("./webpack.server.config");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";

module.exports = {
  css: {
    extract: process.env.NODE_ENV === "production",
  },
  configureWebpack: () => {
    return TARGET_NODE ? server : client;
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        merge(options, {
          optimizeSSR: false,
        });
      });

    // fix ssr hot update bug
    if (TARGET_NODE) {
      config.plugins.delete("hmr");
    }
  },
};
