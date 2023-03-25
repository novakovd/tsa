const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BuildHashPlugin = require("build-hash-webpack-plugin");

module.exports = {
    entry: {
        home: './src/client/home.ts',
        'reveal-confirm': './src/client/reveal-confirm.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "assets/[name].min.js"
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            "..."
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'assets/app.min.css'}),
        new CssMinimizerPlugin(),
        new BuildHashPlugin({filename: "../dist/webpack-build-hash.json"})
    ],
}