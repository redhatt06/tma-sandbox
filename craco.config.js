// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Log the existing configuration to debug
      console.log(JSON.stringify(webpackConfig, null, 2));

      // Exclude source-map-loader for specific modules
      const sourceMapLoaderRule = webpackConfig.module.rules.find(rule => {
        return rule.enforce === 'pre' && rule.use && rule.use.some(loader => loader.loader === 'source-map-loader');
      });

      if (sourceMapLoaderRule) {
        sourceMapLoaderRule.exclude = [
          ...sourceMapLoaderRule.exclude || [],
          /@tonconnect\/sdk/,
          /@tonconnect\/protocol/
        ];
      }

      // Ignore specific warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /@tonconnect\/sdk/,
          message: /Failed to parse source map/
        },
        {
          module: /@tonconnect\/protocol/,
          message: /Failed to parse source map/
        }
      ];

      return webpackConfig;
    }
  }
};
