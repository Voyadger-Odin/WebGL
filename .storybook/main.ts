import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/shared/ui/**/*.(stories|story).@(js|jsx|ts|tsx)',
    '../src/entities/**/*.(stories|story).@(js|jsx|ts|tsx)',
  ],
  addons: [
    // "@storybook/addon-links",
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    '../public',
    {
      from: '../public/fonts',
      to: 'public/fonts',
    },
  ],
  webpackFinal: async (config) => {
    // Reference: https://medium.com/@jgatjens/load-svg-files-as-components-nextjs-storybook-8e3b117e27f0
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule?.['test']?.test('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule['exclude'] = /\.svg$/;
    }

    // Configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      },
    });

    return config;
  },
};
export default config;
