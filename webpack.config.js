var path = require("path");
module.exports = {
  entry: {
    index:"./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build/commonjs"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'raw-loader'
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['flow',"env"],
            plugins: [
              "transform-flow-strip-types",
              require("babel-plugin-transform-react-jsx"), 
              require("babel-plugin-transform-class-properties"),
              require("babel-plugin-transform-object-rest-spread"),
              
            ]
          }
        }
      }
    ]
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      umd: "react",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      umd: "react-dom",
      root: "ReactDOM"
    }
  }
};
