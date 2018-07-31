const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.(png|jpg|gif)$/,
              loader:'file-loader',
          },
          { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
      },

    devServer:{
        port: 3000,
        contentBase: './public',
        inline: true,
        headers: { 
          "Access-Control-Allow-Origin": "*"
      }
    },

}