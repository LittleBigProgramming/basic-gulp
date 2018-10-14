var gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    cleanCSS = require('gulp-clean-css'),

    inDevelopment = (process.env.NODE_ENV === 'production'),

    folder = {
        src: 'src/',
        build: 'build/'
    };

    gulp.task('images', function() {
        var out = folder.build + 'images/';

        return gulp.src(folder.src + 'images/**/*')
            .pipe(newer(out))
            .pipe(imagemin({ optimizationLevel: 5 }))
            .pipe(gulp.dest(out));
    });

    gulp.task('css', function() {
        var out = folder.build + 'css/';

        return gulp.src(folder.src + 'css/*.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(out));
    });

    gulp.task('scss', ['images'], function() {

        var postCssOpts = [
            assets({ loadPaths: ['images/'] }),
            autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
            mqpacker
        ];

        if (!inDevelopment) {
            postCssOpts.push(cssnano);
        }

        return gulp.src(folder.src + 'scss/main.scss')
            .pipe(sass({
                outputStyle: 'nested',
                imagePath: 'images/',
                precision: 3,
                errLogToConsole: true
            }))
            .pipe(postcss(postCssOpts))
            .pipe(gulp.dest(folder.build + 'css/'));

    });

    gulp.task('js', function() {
        var jsbuild = gulp.src(folder.src + 'js/**/*')
            .pipe(deporder());

            // Could concatenate all js files in one using .pipe(concat('main.js'));

        if (!inDevelopment) {
           jsbuild = jsbuild
                .pipe(stripdebug())
                .pipe(uglify());
        }

        return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
    });

    gulp.task('html', ['images'], function() {
        var out = folder.build + 'html/',
            page = gulp.src(folder.src + 'html/**/*')
                .pipe(newer(out));

        if (!inDevelopment) {
            page = page.pipe(htmlclean());
        }

        return page.pipe(gulp.dest(out));
    });

    gulp.task('run-all', ['html', 'css', 'js']);

    gulp.task('watch', function() {
        gulp.watch(folder.src + 'images/**/*', ['images']);
        gulp.watch(folder.src + 'html/**/*', ['html']);
        gulp.watch(folder.src + 'js/**/*', ['js']);
        gulp.watch(folder.src + 'scss/**/*', ['css']);
    });
;