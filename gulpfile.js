
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), //加前缀
    minifycss = require('gulp-minify-css'), //压缩css
    uglify = require('gulp-uglify'), //压缩JS
    imagemin = require('gulp-imagemin'), //压缩图片
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'),//不选此文件
    notify = require('gulp-notify'),//输出信息
    del = require('del'); //删除文件
    htmlmin = require('gulp-htmlmin'); //压缩html代码
    runSequence = require('gulp-sequence');//按顺序执行


// Clean 
gulp.task('clean', function () {
   return del(['dist/**/*'])
});

// Styles
gulp.task('styles', function () {
    return gulp.src('src/assets/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
});
//  htmlmin
gulp.task('htmlmin', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});
// Scripts
gulp.task('scripts', function () {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
});
// fonts
gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts'))
});
// Images
gulp.task('images', function () {
    return gulp.src('src/assets/i/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('default', function(cb) {  
    runSequence('clean', ['styles', 'scripts', 'images', 'fonts', 'htmlmin'], cb);
});