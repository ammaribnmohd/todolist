const { DefinePlugin } = require('webpack');
const mix = require('laravel-mix');
const { VueLoaderPlugin } = require('vue-loader');
mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        // Add your PostCSS plugins here if any
    ])
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm-bundler.js'
            }
        },
        plugins: [
            new VueLoaderPlugin(),
            new DefinePlugin({
                '__VUE_OPTIONS_API__': JSON.stringify(true),
                '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
                '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
            }),
        ]
    });
