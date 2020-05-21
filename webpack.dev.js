const path = require('path') // path is a native Node.js module
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
    mode: "development", // development mode will not minify js
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist") // path to place compiled minified js(path, to, file) // __dirname is a macro for current working directory
    },
    module: {
        rules: [

            {
                test: /\.css$/i, //   RegEx if file ends with ".sass" or ".css"
                use: [
                    'style-loader', // inject CSS to page
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
            {
                test: /\.s[ac]ss$/i, //   RegEx if file ends with ".sass" or ".css"
                use: [
                    'style-loader', // inject CSS to page
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
            }, 
        ]
    }
})