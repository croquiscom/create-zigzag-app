const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");

module.exports = (env, arg) => {
  const STAGE = arg.stage || 'alpha';

  const config = {
    entry: "./src/index.tsx",
    output: {
      path: Path.join(process.cwd(), "dist"),
      filename: "[name].[chunkhash].js",
      crossOriginLoading: false
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
      rules: [{
        test: /\.(png|jpg|svg|eot|woff|woff2)$/,
        loader: "file-loader"
      }, {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: 'local'
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  grid: "autoplace"
                }),
                require("cssnano")()
              ]
            }
          },
          "sass-loader"
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        minify: true,
        title: 'create-zigzag-app' // 변경해야함.., 수정을 강제하는 설정은 없을까?
      }),
      new webpack.DefinePlugin({ STAGE: JSON.stringify(STAGE) })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 4200,
      historyApiFallback: true
    },
  };

  if (arg.mode === "production") {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin()
    ]);
  }

  return config;
};
