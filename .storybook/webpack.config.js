const path = require('path');

module.exports = {
  module: {
    rules: [
        {
            test: /\.svg$/,
            use: 'raw-loader'
        }
    ]
  }
}