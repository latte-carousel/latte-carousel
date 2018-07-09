const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: "./src/ts/carousel.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".css", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(["./dist"]),
        new MiniCssExtractPlugin({
            filename: "latte-carousel.min.css",
            chunkFilename: "latte-carousel.min.css",
        }),
        new webpack.BannerPlugin(fs.readFileSync("./src/version", "utf8")),
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "latte-carousel.min.js",
        library: "latte",
        libraryTarget: "umd",
    },
};
