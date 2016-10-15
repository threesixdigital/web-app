'use strict';

//	------------------------------------------------
//	Modules
//	------------------------------------------------
var gulp 							= require('gulp');
var sass 							= require('gulp-sass');
var useref 							= require('gulp-useref');
var uglify 							= require('gulp-uglify');
var gulpIf 							= require('gulp-if');
var cssnano 						= require('gulp-cssnano');
var imagemin 						= require('gulp-imagemin');
var cache 							= require('gulp-cache');
var autoprefixer 					= require('gulp-autoprefixer');

var runSequence 					= require('run-sequence');
var browserSync 					= require('browser-sync').create();


//	------------------------------------------------
//	Browser Sync
//	------------------------------------------------
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'public'
		},
	})
});



//	------------------------------------------------
//	Compile Sass to CSS
//	------------------------------------------------
gulp.task('sass', function() {
	return gulp.src('./public/scss/main.scss')
	.pipe(sass())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});



//	------------------------------------------------
//	Concatenates and optimizes files for frontend
//	------------------------------------------------
gulp.task('useref', function() {
	return gulp.src(['public/**/*.html', 'public/**/*.css', '!./public/libs/**', 'public/images/**/*.+(png|jpg|gif|svg)'])
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/public'))
});



//	------------------------------------------------
//	Opimizes server files
//	------------------------------------------------
gulp.task('app', function() {
	return gulp.src(['app/**/*.js'])
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist/app'))
});

gulp.task('config', function() {
	return gulp.src(['config/**/*.js'])
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist/config'))
});

gulp.task('routes', function() {
	return gulp.src(['routes.js'])
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist'))
});

gulp.task('server', function() {
	return gulp.src(['server.js'])
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist'))
});



//	------------------------------------------------
//	Adds package.json to dist folder
//	------------------------------------------------
gulp.task('package', function() {
	return gulp.src('package.json')
	.pipe(gulp.dest('dist'))
})



//	------------------------------------------------
//	Watching files for changes
//	------------------------------------------------
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('./public/scss/**/*.scss', ['sass']);
	gulp.watch('./public/*.html', browserSync.reload);
	gulp.watch('./public/js/**/*.js', browserSync.reload);
});



//	------------------------------------------------
//	Runs task
//	------------------------------------------------
gulp.task('default', function() {
	runSequence(['sass', 'browserSync', 'watch'])
});


//	------------------------------------------------
//	Builds folder for deployment
//	------------------------------------------------
gulp.task('build', function() {
	runSequence(['sass', 'useref', 'app', 'config', 'routes', 'server', 'package'])
});
