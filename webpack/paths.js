const path = require('path')
const fs = require('fs')

const root = fs.realpathSync(path.resolve(__dirname, '../../'))
const resolve = p => path.resolve(root, p)

const paths = {
    root: {
        dist: resolve('dist'),
        public: resolve('public'),
        html: resolve('public/index.html'),
        favicon: resolve('public/favicon.ico')
    },
    api: {
        root: resolve('api'),
        src: resolve('api/src'),
        index: resolve('api/src/index.ts'),
        node_modules: resolve('api/node_modules')
    },
    app: {
        root: resolve('app'),
        src: resolve('app/src'),
        index: resolve('app/src/index.tsx'),
        node_modules: resolve('app/node_modules')
    }
}

module.exports = paths
