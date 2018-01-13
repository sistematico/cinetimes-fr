/* Refrences:
1. http://notes.iissnan.com/2016/publishing-github-pages-with-travis-ci
2. https://github.com/chrisjlee/hexo-theme-zurb-foundation/blob/e82f45a82bbaaee063bcb1298cd9793575afb142/gulpfile.js
3. https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md
4. https://hexo.io/api/
5. https://github.com/iissnan/theme-next-docs/blob/master/.travis.yml
*/

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var Hexo = require('hexo');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var minify = require("gulp-babel-minify");


gulp.task('clean', function() {
    return del(['public/**/*']);
});

// generate html with 'hexo generate'
var hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb();
    }).catch(function(err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    });
});

gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task("minify-js", () => {
  gulp.src('./public/**/*.js')
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./public"));
});

gulp.task('minify-img', function() {
    return gulp.src('./public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
});

// cinetimes-fr/themes/cinetime/source/img/16-9/
gulp.task('thumbnail-card', function(){
    gulp.src('./themes/cinetime/source/img/16-9/*')
      .pipe(imageResize({
        width: 302,
        height: 181,
      }))
      .pipe(rename(function(path){
        path.basename = "card_" + path.basename;
      }))
      .pipe(gulp.dest('./themes/cinetime/source/img/'));
});

gulp.task('thumbnail-poster', function(){
    gulp.src('./themes/cinetime/source/img/16-9/*')
      .pipe(imageResize({
        width: 1280,
        height: 720,
      }))
      .pipe(rename(function(path){
        path.basename = "poster_" + path.basename;
      }))
      .pipe(gulp.dest('./themes/cinetime/source/img/'));
});

gulp.task('thumbnail-next', function(){
    gulp.src('./themes/cinetime/source/img/16-9/*')
      .pipe(imageResize({
        width: 168,
        // height: 101,
      }))
      .pipe(rename(function(path){
        path.basename = "next_" + path.basename;
      }))
      .pipe(gulp.dest('./themes/cinetime/source/img/'));
});

gulp.task('thumbnail-cover', function(){
    gulp.src('./themes/cinetime/source/img/cover/*')
      .pipe(imageResize({
        height: 256,
      }))
      .pipe(rename(function(path){
        path.basename = "cover_" + path.basename;
      }))
      .pipe(gulp.dest('./themes/cinetime/source/img/'));
});

gulp.task('compress', function(cb) {
    runSequence([ 'minify-html', 'minify-css', 'minify-img', 'minify-js'], cb);
});
//removed :

gulp.task('resize', function(){
    runSequence(['thumbnail-card', 'thumbnail-poster', 'thumbnail-cover', 'thumbnail-next']);
});

//gulp.task('build', ['clean', 'generate', 'compress']);
gulp.task('build', function(cb) {
    runSequence('clean', 'generate', 'resize', 'compress', cb);
});

//removed :  'resize',

gulp.task('default', []);
