# webpack-config

This is my shared [Webpack](http://webpack.github.io) config used in most of my projects. It compiles JavaScript and TypeScript with [Babel](https://babeljs.io). It is also configured to add hashes to filenames for easy caching, and inlines images and fonts as Data URIs if small enough.

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
const configure = require('web-chunks')

module.exports = configure({
    entry: './app/entry', // defaults to ./src
    output: {
        path: './foo/' // defaults to ./dist and other rules
    }
    // Override any other Webpack settings here!
    // see: https://webpack.js.org/configuration/

    // Default config can be found here https://github.com/bafxyz/web-chunks/blob/master/src/index.ts
})
```

Supports out of the box: `babel (typescript, react), css, sass, eslint, small assets as base64, images minifation, source maps`

If for some reason full webpack config is not needed, you can still use some loaders

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

This package uses [PostCSS](https://postcss.org/) to post-process your stylesheets, so you will need to create a `postcss.config.js` in your project directory:

```js
// postcss.config.js

module.exports = {
    sourceMap: true,
    plugins: [require('autoprefixer')]
}
```

## To be able to use all the features from this webpack config be sure what you install all the necessary peerDependencies

Now you can run `npm start` to build with source maps and watch for changes, and `npm run build` to build optimized assets for production! If you need to further customize your build, you can pass any overrides in to the configure function.

### License

&copy; This config is free software, and may be redistributed under the
terms specified in the [LICENSE](https://github.com/bafxyz/web-chunks/blob/master/LICENSE) file.
