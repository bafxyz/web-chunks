# webpack-config

This is shared [Webpack](http://webpack.github.io) config used for js projects. It compiles JavaScript and TypeScript with [Babel](https://babeljs.io). It is also configured to add hashes to filenames for easy caching, and inlines images and fonts as Data URIs if small enough.

### Getting Started

Install this package and Webpack via NPM:

```
npm install webpack @bafxyz/config --save-dev
```

Add some scripts to your `package.json`:

```js
{
  // ...
  "scripts": {
    "start": "webpack --env=development --hide-modules --watch",
    "build:dev": "webpack --env=development --hide-modules",
    "build": "webpack --env=production",
  }
}
```

Create a `webpack.config.js` in your project directory, and set it up like so:

```js
// webpack.config.js

var webpack = require('webpack')
var configure = require('@bafxyz/config')

module.exports = configure({
    entry: {
        // Add your bundles here, so in this case
        // ./src/app.js ==> ./dist/app-[hash].js
        app: './src/app.js'
    }

    // Override any other Webpack settings here!
    // see: https://webpack.js.org/configuration/
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

For example, the above configuration post-processes your CSS Autoprefixer.

Now you can run `npm start` to build with source maps and watch for changes, and `npm run build` to build optimized assets for production! If you need to further customize your build, you can pass any overrides in to the configure function.

### License

&copy; This config is free software, and may be redistributed under the
terms specified in the [LICENSE](https://github.com/bafxyz/config/blob/master/LICENSE) file.
