'use strict';

const stream = require('stream');

const gulp = require('gulp');
const utils = require('gulp-util');

const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

const babelify = require('babelify');
const browserify = require('browserify');
const prettyBytes = require('pretty-bytes');
const incremental = require('browserify-incremental');

const File = utils.File;

const LIVE = !!~process.argv.indexOf('--production');

const PORT = 9001;
const DEST = './out';
const SOURCE = './src';
const CACHE = './build.json';

function pass() {
	return new stream.Transform({
		objectMode: true,
		transform(file, enc, next) {
			next(null, file);
		},
	});
}

function buffer(filename) {
	let chunks = '';

	return new stream.Transform({
		objectMode: true,

		transform(chunk, enc, next) {
			chunks += chunk;
			next();
		},

		flush(done) {
			this.push(new File({
				path: filename,
				contents: new Buffer(chunks),
			}));
			done();
		},
	});
}

gulp.task('build', function() {
	const build = browserify(Object.assign({}, incremental.args, {
		entries: SOURCE + '/index.js',
		debug: true,
	}));

	if (!LIVE) {
		incremental(build, {cacheFile: CACHE});
	}

	return build
		.on('log', function(info) {
			const parts = info.split(/\s*bytes\s*/);
			parts[0] = prettyBytes(+parts[0]);
			utils.log(utils.colors.green('Build info:'), parts.join(' '));
		})
		.transform(babelify, {
			global: true,
			presets: ['es2015', 'react'],
		})
		.bundle()
		.on('error', function(error) {
			utils.log(utils.colors.red('Browserify compile error:'), error.message);
			this.emit('end');
		})
		.pipe(buffer('app.js'))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(LIVE ? uglify() : pass())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DEST))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.start('build');

	watch([SOURCE + '/**/*.js'], function() {
		gulp.start('build');
	});
});

gulp.task('serve', ['watch'], function() {
	connect.server({
		root: DEST,
		port: PORT,
	});
});

gulp.task('default', ['build']);
