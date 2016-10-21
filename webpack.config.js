module.exports = {
    output: {
        filename: 'main.js'
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