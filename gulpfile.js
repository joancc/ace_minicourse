var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

//gulp.task('compress', function() {
    //TODO: Serving compressed files from S3. (We're only minifying for now)
    //To use gzip with S3 we have to intercept calls and change the url depending on the content-header
    //Sample full compression with gzip:
    //gulp.src('./js/**/*.js', {base: './'})
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write())
    //.pipe(gzip())
    //.pipe(gulp.dest('./dist'));
//});

/**** VENDOR *****/
gulp.task('vendor-js', function(){
    // js
    gulp.src('./vendor/**/*.js', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-css', function(){
    // css
    gulp.src('./vendor/**/*.css', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('app-js', function() {
    /**** APP JS *****/    
    gulp.src('./js/**/*.js', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(uglify()).on('error', errorHandler)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('app-css', function() {
    /**** CSS *****/    
    gulp.src('./css/**/*.css', {base: './'})
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('./js/**/*.js', ['app-js']);
    gulp.watch('./css/**/*.css', ['app-css']);
    gulp.watch('./vendor/**/*.js', ['vendor-js']);
    gulp.watch('./vendor/**/*.css', ['vendor-css']);
});

// DEFAULT task
gulp.task('default', ['app-css', 'app-js', 'vendor-js', 'vendor-css', 'watch']);

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}