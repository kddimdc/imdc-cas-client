module.exports = {
    output: {
        filename: 'imdc_cas_client.js'
    },
    resolve: {
        extensions: ['','.webpack.js','.ts','.tsx','.js']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
}