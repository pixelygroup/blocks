const path = require('path');

const alias = {
  '@': path.join(__dirname, '../src'),
  'components': path.join(__dirname, '../src/components'),
  'stories':  path.join(__dirname, '../stories/'),
}

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  stories: [
    '../src/docs/**/*.stories.@(js|mdx)',
    '../src/components/**/*.stories.@(js|mdx)'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias
    }

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            data: `
              $blocks-asset-path: "~@/assets";
              $blocks-font-path: "~@/assets/fonts";
            `,
          }
        },
      ],
    });

    const jsRule = config.module.rules.find(rule => rule.test.source === '\\.(mjs|jsx?)$')

    config.module.rules = config.module.rules.map(rule => {
      if (rule.test && rule.test.toString().includes('woff')) {
        return {
          ...rule,
          test: /\.(svg|ico|jpg|jpeg|png|gif|webp|cur|ani|pdf)(\?.*)?$/
        }
      }
      return rule
    });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf)$/,
      loaders: ['file-loader'],
      include: path.resolve(__dirname, '../')
    });

    return config;
  }
}
