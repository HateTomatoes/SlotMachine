/**
 * Created by 讨厌西红柿 on 2019-12-06
 **/
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const theme = require('./antd-theme');
const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        // strictMath: true,
        // noIeCompat: true,
        modifyVars: theme,
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackAlias({
        "@": resolve("src"),
        '@components': resolve('src/components/'),
    }),
);