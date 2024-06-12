// craco.config.js

const webpack = require("webpack");
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Log the existing configuration to debug
      console.log(JSON.stringify(webpackConfig, null, 2));

      // Exclude source-map-loader for specific modules
      const sourceMapLoaderRule = webpackConfig.module.rules.find((rule) => {
        return (
          rule.enforce === "pre" &&
          rule.use &&
          rule.use.some((loader) => loader.loader === "source-map-loader")
        );
      });

      if (sourceMapLoaderRule) {
        sourceMapLoaderRule.exclude = [
          ...(sourceMapLoaderRule.exclude || []),
          /@tonconnect\/sdk/,
          /@tonconnect\/protocol/,
        ];
      }

      // Ignore specific warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /@tonconnect\/sdk/,
          message: /Failed to parse source map/,
        },
        {
          module: /@tonconnect\/protocol/,
          message: /Failed to parse source map/,
        },
      ];

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve("buffer/"),
      };
      webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ];

      return webpackConfig;
    },
  },
  eslint: {
    configure: (eslintConfig) => {
      eslintConfig.rules = {
        ...eslintConfig.rules,
        // Disable ESLint rule for BigInt
        "no-undef": ["error", { typeof: true }],
      };
      return eslintConfig;
    },
  },
};
