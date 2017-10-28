import path from "path"
import webpack from "webpack"
import _ from "lodash"
import config from "../src/config/config"
import precss from 'precss'
import autoprefixer from 'autoprefixer'

const srcPath    = path.resolve(__dirname, "../src")
const assetsPath = path.resolve(__dirname, "../../static")

export default {
  devtool: 'source-map',
  entry: {
    "main": [
      "react-hot-loader/patch",
      "babel-polyfill",
      "webpack-dev-server/client?http://" + config.WEBPACK_HOST + ":" + config.WEBPACK_PORT + "/",
      "webpack/hot/only-dev-server",
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
      {test: /\js(x)?$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ["react"]} },
      {test: /\.css$/,   use: ["style-loader", "css-loader", "postcss-loader"] },
      {test: /\.less$/,  use: ["style-loader", "css-loader", "postcss-loader", "less-loader?include_paths[]=" + srcPath] },
      {
        test: /.*\.(gif|png|jpe?g|pdf|svg)$/i,
        use: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive: true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ],
    // noParse: [/node_modules/]
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new webpack.DefinePlugin({
      "__DEV__" : JSON.stringify(process.env.NODE_ENV === "development"),
      "__PROD__": JSON.stringify(process.env.NODE_ENV === "production")
    }),
  ],
}
