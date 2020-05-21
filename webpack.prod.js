const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path') // path is a native Node.js module
const common = require('./webpack.common')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: "production", // production mode will minify js
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist") // path to place compiled minified js(path, to, file) // __dirname is a macro for current working directory
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, //   RegEx if file ends with ".sass" or ".css"
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS to files
                    'css-loader', // translates CSS into CommonJS modules
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer') // Cross-browser compatibility
                            ];
                            }
                        }
                    },
                    'sass-loader' // compiles Sass to CSS
                ]
            }, {
                test: /\.css$/i, //   RegEx if file ends with ".sass" or ".css"
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS to files
                    'css-loader', // translates CSS into CommonJS modules
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer') // Cross-browser compatibility
                            ];
                            }
                        }
                    },
                ]
            }, 
        ]
    }
})