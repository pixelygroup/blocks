# Blocks Library

> Frontend pattern library for Bought By Many

## Install

Install the module using npm

```
npm install @pixely/blocks --save
```

Import the base UI into your app build, or follow Install with Plugin.

```
@import "~@pixely/blocks/src/sass/ui/ui.scss";
```

Ensure that blocks is part of your transpile dependencies in vue.config.js

```
transpileDependencies: [
  '@pixely/blocks',
]
```

## Install with plugin

Create file `src/plugins/blocks.js`:
```
import Vue from 'vue'
import BlocksPlugin from '@pixely/blocks/src/plugins'
import '@pixely/blocks/src/sass/ui/ui.scss'

Vue.use(BlocksPlugin, {
  // ...options
})
```

In `src/main.js` add:
```
import './plugins/blocks.js'
```

Available options with defaults:
```
{
  modalPlugin: true, // Automatically installs ModalPlugin
  modalPluginAutoMount: true, // Mounts an instance of PxPxModalContainer so it can be used without configuration.
  components: null, // Can be used to bind pattern components globally
  settings: { // Provides the prototype for setting Global Defaults
    SiteHeader: {
      headroom: false,
    },
  },
}
```

## Using components

Components should be imported from the main interface file. Do not import the component from its individual folder as this is liable to change.

```
import { PxButton } from '@pixely/blocks'
```

Optionally, you can install [blocks-loader](https://github.com/pixely/blocks-loader) webpack plugin, that will deal with imports automatically.

## Global Defaults

Installing Blocks with the plugin exposes a prototype `$blocks` which can be used to change some component behaviour in runtime. In any `.vue` file you can change default of a component. For example SiteHeader has a headroom prop. This can be toggled on and off in the app:
```
methods: {
    enableHeadroom() {
        this.$blocks.settings.SiteHeader.headroom = true
    }
}
```

`headroom` prop is false by default, but it can be changed, when initialising the plugin:
```
// `src/plugins/blocks.js`
...
Vue.use(BlocksPlugin, {
   settings: {
      SiteHeader: {
        headroom: true,
      },
   },
})
```

If a component receives a prop, but is also using a default config it will prioritise a prop.
```
// this.$blocks.settings.SiteHeader.headroom = true

<SiteHeader :headroom="false" /> // final headroom value will be false, because prop has a higher priority.
```

## Modal Plugin

Modal plugin adds a way to programmatically toggle Modals on and off. By default, it's automatically installed with the Blocks plugin.

```
this.$modal.show(...args)
this.$modal.dismiss(...args)
```

Check Storybook for usage examples.

## Contributing

### Project setup
```
npm install
```
### Run storybook
```
npm run storybook
```
### Build storybook
```
npm run build-storybook
```

### Coding standards

The [Vue CLI ESLint plugin](https://cli.vuejs.org/config/#eslint) is used to lint code.

Code is linted automatically on save during development by the Webpack plugin,
[eslint-loader](https://github.com/webpack-contrib/eslint-loader). Linting is
also performed on staged files before a commit. If you use VS Code, it will be
set up to lint as you type and fix auto-fixable issues on save.

To manually lint code, run:

```shell
npm run lint # To check for linting issues
npm run lint:fix # To fix all auto-fixable issues
```

ESLint can also be [integrated within other IDEs](https://eslint.org/docs/user-guide/integrations).

#### Styling

We also use `stylelint` to lint the (S)CSS. It runs on git commit, and in VS
Code it'll run on save. We don't currently integrate into vue-cli/webpack with
it but this may be a future thing as it _is_ possible.

It can be run manually:

```shell
npm run lint:css # To check for linting issues
npm run lint:css:fix # To fix all auto-fixable issues
```

#### Commit messages

This repo also uses `commitlint` to enforce a standard in regards to commit messages.

You can read up more on `commitlint` and the idea of conventional commits
[here](https://github.com/conventional-changelog/commitlint#what-is-commitlint).
Also
[here](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits)
and
[here](https://slides.com/marionebl/the-perks-of-committing-with-conventions#/).

Our specific ruleset is the
[`conventional`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
one.
