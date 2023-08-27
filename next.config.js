/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
const nextConfig = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    return config;
  },
  sassOptions: {
    loadPaths: [path.join(__dirname, "app/styles/")],
  },
};

module.exports = nextConfig;
