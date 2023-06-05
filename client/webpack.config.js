// Import required modules
const HtmlWebpackPlugin = require('html-webpack-plugin');  // A plugin to simplify creation of HTML files to serve webpack bundles
const WebpackPwaManifest = require('webpack-pwa-manifest'); // A plugin to generate a 'manifest.json' for Progressive Web Applications
const path = require('path'); // A Node.js module providing utilities for working with file and directory paths
const { InjectManifest } = require('workbox-webpack-plugin'); // A plugin to pre-cache files using a service worker, useful for PWA

// Export the webpack configuration object
module.exports = () => {
  return {
    // Set the mode to 'development'
    mode: 'development',

    // Define the entry points for the webpack
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
    },

    // Define the output settings
    output: {
      filename: '[name].bundle.js', // The name of the output file
      path: path.resolve(__dirname, 'dist'), // The output directory
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
        name: 'Definitely_Not_Malware',
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
        // Rule for CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Rule for JavaScript files
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
