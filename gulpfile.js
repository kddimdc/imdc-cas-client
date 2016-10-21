var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync')
    reload = browserSync.reload

function toNPMPaths (module) {
  return 'node_modules/'+ module
}


gulp.task('js',()=>{
    return gulp.src('src/js/index.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .on('error', function handleError(){
            this.emit('end')
        })
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('vendor',()=>{
    //js
    gulp.src([
        'jquery/dist/jquery.min.js',
        'bootstrap/dist/js/bootstrap.min.js',
    ].map(toNPMPaths))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
    //css
    gulp.src([
        'bootstrap/dist/css/bootstrap.min.css',
       
    ].map(toNPMPaths))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('plugins',()=>{
    return gulp.src('src/plugins/*.js')
        .pipe(gulp.dest('dist/js/plugins'))
})

gulp.task('html',()=>{
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('css',()=>{
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('watch', function() {
  gulp.watch( './src/css/**.css', ['css',reload])
  gulp.watch( './src/js/**.ts', ['js',reload])
  gulp.watch( './src/**.html', ['html',reload])
})

gulp.task('server', function() {
    browserSync({
      notify: false,
      server: {
         baseDir: './dist/'
      }
    })
})

gulp.task('default',['js','html','css','vendor','plugins','watch','server'])
