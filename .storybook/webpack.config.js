const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const vueConfig = require('@vue/cli-service/webpack.config.js');
module.exports = (storybookBaseConfig, configType, storybookConfig) => {


  const config = {
    ...vueConfig, // use vue's webpack configuration by default
    entry: storybookConfig.entry, // overwite entry
    output: storybookConfig.output, // overwrite output
    externals: storybookConfig.externals,
    plugins: [
      ...storybookConfig.plugins.filter(i => i.constructor.name !== 'ForkTsCheckerWebpackPlugin'),
      new ForkTsCheckerWebpackPlugin(
        {
          vue: true,
          tslint: true,
          formatter: 'codeframe',
          checkSyntacticErrors: false
        }
      )
    ],
    resolve: { // <--------- This bit here
      ...vueConfig.resolve,
      // ...storybookConfig.resolve,
      alias: {
        ...vueConfig.resolve.alias,
        ...storybookConfig.resolve.alias,
        vue$: storybookConfig.resolve.alias.vue$
      }
    }
  };

  return config;
};
