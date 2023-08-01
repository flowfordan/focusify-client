/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    loadPaths: [path.join(__dirname, "app/styles/")],
  },
};

module.exports = nextConfig;
