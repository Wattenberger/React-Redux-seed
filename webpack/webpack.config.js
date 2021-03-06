var path = require("path")
var webpack = require("webpack")
var _ = require("lodash")
var config = require("../src/config/config")

const srcPath    = path.resolve(__dirname, "../src")
const assetsPath = path.resolve(__dirname, "../../static")

module.exports = {
  entry: {
    "main": [
      "./src/entry.js"
    ],
  },
  target: "web",
  output: {
    path: assetsPath,
    publicPath: "//" + config.STATIC_HOST + "/static/",
    filename: "app.min.js",
    chunkFilename: "[chunkhash].js"
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', srcPath]
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader",
        query: {
          plugins: ["transform-decorators-legacy"],
          presets: ["react", "es2015", "stage-0"],
        }
      },
      {test: /\.css$/,   use: ["style-loader", "css-loader", "postcss-loader"] },
      {test: /\.scss$/,  use: ["style-loader", "css-loader", "postcss-loader", "sass-loader?include_paths[]=" + srcPath] },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive: true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ]
      },
    ],
    // noParse: [/node_modules/]
    noParse: [/ignore/]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      "__DEV__" : JSON.stringify(process.env.NODE_ENV === "development"),
      "__PROD__": JSON.stringify(process.env.NODE_ENV === "production")
    }),
  ]
}
