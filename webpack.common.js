var HtmlWebpackPlugin = require('html-webpack-plugin'); // writes html with script tags included
const path = require('path') // path is a native Node.js module

module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/index.template.html",
        }),
        new HtmlWebpackPlugin({
            filename: 'resume.html',
            template: "./src/resume.template.html",
        }),
    ],
    resolve: {
        alias: {
            Node: path.resolve(__dirname, "node_modules")
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/i, //   RegEx if file ends with "html"
                use: [
                    'html-loader' // Exports html as a string, minimizes for builds
                ]
            }, {
                test: /\.(svg|png|jpe?g|mp4|gif)$/i, //   RegEx if file ends with ".sass" or ".css"
                use: [
                    {
                        loader: 'file-loader', // Emits the file into the output folder and returns the (relative) URL
                        options: {
                            esModule: false,
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs"
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 10000,
                        outputPath: "fonts"
                      },
                    },
                  ],
            }
        ],
    },
}