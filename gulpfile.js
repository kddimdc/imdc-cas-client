var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    ts = require('gulp-typescript')
    browserSync = require('browser-sync')
    reload = browserSync.reload
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify')

function toNPMPaths (module) {
  return 'node_modules/'+ module
}


gulp.task('js',()=>{
    return gulp.src('src/js/index.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'imdc_cas_client.js'
        }))
        .on('error', function handleError(){
            this.emit('end')
        })
        // .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('html',()=>{
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
  gulp.watch( './src/**.html', ['html',reload])
  gulp.watch( './src/js/**.ts', ['js',reload])
})


gulp.task('vendor',()=>{
    //js
    gulp.src([
       'xml2js/lib/xml2js.js'
    ].map(toNPMPaths))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('server', function() {
    browserSync({
      notify: false,
      server: {
         baseDir: './dist/'
      }
    })
})

gulp.task('default',['js','html','watch','vendor','server'])
