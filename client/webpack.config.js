// Import required modules
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const WebpackPwaManifest = require('webpack-pwa-manifest'); 
const path = require('path'); 
const { InjectManifest } = require('workbox-webpack-plugin'); 

// Export the webpack configuration object
module.exports = () => {
  return {
    mode: 'development',

    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
    },

    output: {
      filename: '[name].bundle.js', 
      path: path.resolve(__dirname, 'dist'), 
    },

    // Define the plugins used by webpack
    plugins: [ 

      // HtmlWebpackPlugin: Simplifies creation of HTML files to serve the bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Definitely_Not_Malware',
      }),

      // InjectManifest: Pre-caches files using a service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // WebpackPwaManifest: Generates 'manifest.json' for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Jate',
        short_name: 'JATE',
        description: 'Type code or text and save it to the database',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        scope: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    // Define the module rules
    module: {

      rules: [
     
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

  
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
