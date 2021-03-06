# webpack-config

This is my [Webpack](http://webpack.github.io) config, which i'm gonna use in most of the projects. It compiles JavaScript and TypeScript with [Babel](https://babeljs.io).
It also adds hashes to filenames for easy caching and inlines small images and fonts as Data URIs, for big images it adds compression 80%

### Getting Started

Install this package and Webpack via NPM:

```
npm install webpack web-chunks --save-dev
```

Add some scripts to your `package.json`:

```js
{
  // ...
    "scripts": {
        "clean": "rm -rf dist",
        "start": "webpack-dev-server --env=development --port 5000 --host=0.0.0.0",
        "build": "webpack --env=production",
        "build:watch": "npm run clean && webpack --env=prodduction --hide-modules --watch"
    }
}
```

Create a `webpack.config.js` in your project directory, and set it up like so:

```js
// webpack.config.js

const webpack = require('webpack')
const config = require('web-chunks')

module.exports = config({
    entry: './app/entry', // default {app: `src/index.ts`}
    output: {
        path: './foo/' // default ./dist
    }

    // Override any other Webpack settings here!
    // see: https://webpack.js.org/configuration/
})
```

### Default config

can be found here https://github.com/bafxyz/web-chunks/blob/master/src/index.ts

Supports out of the box: `babel (typescript, react), css, sass, eslint, small assets as base64, images minifation, source maps`

If for some reason full webpack config is not needed, you can still use some loaders

### Basic example

```js
// webpack.config.js
const webpack = require('webpack')
const sassLoader = require('web-chunks/dist/loaders/sass')

module.exports = configure({
    module: {
        rules: [
            // Bundle SCSS stylesheets (processed with LibSass & PostCSS), extract to single CSS file per bundle.
            sassLoader()
        ]
    }
})
```

### Custom story book webpack config

```js
// webpack.config.js
const babelLoader = require('web-chunks/dist/loaders/babel').default
const sassLoader = require('web-chunks/dist/loaders/sass').default
const rawLoader = require('web-chunks/dist/loaders/raw').default

module.exports = async ({ config, mode }) => ({
    ...config,
    module: { ...config.module, rules: [babelLoader(), sassLoader(), rawLoader()] },
    resolve: {
        ...config.resolve,
        extensions: [...config.resolve.extensions, '.ts', '.tsx']
    }
})
```

This package uses [PostCSS](https://postcss.org/) to post-process your stylesheets, so you will need to create a `postcss.config.js` in your project directory:

```js
// postcss.config.js

module.exports = {
    sourceMap: true,
    plugins: [require('autoprefixer')]
}
```

### Real examples

https://github.com/bafxyz/react-empty-project
https://github.com/bafxyz/ui-kit

## To be able to use all the features from this webpack config be sure what you install all the necessary peerDependencies

Now you can run `npm start` to build with source maps and watch for changes, and `npm run build` to build optimized assets for production! If you need to further customize your build, you can pass any overrides in to the configure function.

### License

&copy; This config is free software, and may be redistributed under the
terms specified in the [LICENSE](https://github.com/bafxyz/web-chunks/blob/master/LICENSE) file.
