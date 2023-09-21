var ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // Add this import

var baseConfig = require("./webpack.config.js");
baseConfig.plugins.push(new ReactRefreshWebpackPlugin());
var devConfig = {
  mode: "development",
  devServer: {
    // Enable gzip compression for everything served:
    compress: true,
    // Specify a port number to listen for requests on:
    port: 6688,
    // Enable webpack's Hot Module Replacement feature:
    hot: "only",
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings. If you want to show only compiler errors:
    client: {
      overlay: true,
    },
    historyApiFallback: true,
    allowedHosts: "all",
    open: true,
    http2: false,
    https: false,
    host: "0.0.0.0",
    proxy: [
      {
        context: (url) => ["/api/", "/s/"].some((x) => url.indexOf(x) != -1),
        target: `http://localhost:3000`,
        secure: false,
        compress: true,
        ws: true,
        timeout: 0,
      },
    ],
  },
};
module.exports = Object.assign(baseConfig, devConfig);
