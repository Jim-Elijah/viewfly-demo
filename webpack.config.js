const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, "src"),
                options: {
                    presets: [
                        ["@babel/preset-env"],
                        [
                            "@babel/preset-react",
                            {
                                runtime: "automatic",
                                importSource: "@viewfly/core"
                            }
                        ]
                    ],
                }
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "src"),
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html',
            inject: true,
            title: 'viewfly learn',
        })
    ],
    devtool: 'source-map',
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        compress: true,
    }
};