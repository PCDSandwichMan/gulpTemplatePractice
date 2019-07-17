const themeName = 'What-is-this';
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    lineec = require('gulp-line-ending-corrector'),



// The root is commonly use to take you back and reference for every file ( good practice for cleaner larger project )
// Gulp bases your file selecting off of where the gulp file is create or placed
    // You will then want to include the container broad container files that are within your root
const root = '../' = themeName + '/',
    scss = root + 'scss/',
    js = root + 'sass/',
    jsDist = root + 'dist/js/';

// From here we start to break down our file for what we want the gulp to do at the very end

// * This type of selecting is called glob selecting and ' * ' works like a wildcard
    // ? This will you used to constantly check your browser for live updating
const phpWatchFiles = root + '**/*.php',
    styleWatchFiles = scss + '**/*scss';

// * Array will commonly be used so that you only have to put one variable into your gulp task and not 10,000
    // ? This will be selected for contacting and minification
const jsSRC = [
    js + 'exampleFile.js',
    js + 'exampleFile.js',
    js + 'exampleFile.js',
    js + 'exampleFile.js',
    js + 'exampleFile.js',
    js + 'exampleFile.js',
    js + 'exampleFile.js',
];


const cssSRC = [
    root + 'cssLocation.css',
    root + 'cssLocation.css',
    root + 'cssLocation.css',
    root + 'cssLocation.css',
    root + 'cssLocation.css',
]

var imgSRC = root + 'src/images/*',
    imgDEST = root + 'dist/images';



// Now we have our selecting and grouping done we can select start our tasks
// These are placed in function so that that can be exported and specified to run in parallel() or series()

    // * Basic syntax will consist of selecting your file 'gulp.src' changing your information one at a time 'gulp.pipe' and finally piping that information to a new destination '.pipe(gulp.dest(../rootDistFile))' usually being your new production build
        // * The array is used to select multiple files to adjust
        // * While the gulp syntax is straight forward the libraries will have their own syntax that can be found in their documentation
            // ? .on will be used with the sass variable to catch formating mistake (spelling errors, semicolons, missing curly brace)
// * reads you sass and checks for errors
function css() {
    return gulp.src([scss + 'style.css'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pip(gulp.dest(root))
}

// * combines your scss files
function concatCSS() {
    return gulp.src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pip(gulp.dest(scss));
}

// * combines and minifies your JS files
function javascript() {
    return gulp.src(jsSRC)
    .pipe(concat('javascriptCombinedFileName.js'))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsDist));
}

// * minifies your images
function imgmin() {
    return gulp.src(imgSRC)
    .pipe(changed(imgDEST))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
}

function watch() {
    browserSync.init({
        open: 'external',
        proxy: 'https://localhost/dev',
        port: 8080,
    });
    gulp.watch(styleWatchFiles, gulp.series([css, concatCss]));
    gulp.watch(jsSRC, javascript);
    gulp.watch(imgSRC, imagemin);
    gulp.watch([phpWatchFiles, jsDist + 'devwp.js', scss + 'style.min.css']).on('change', browserSync.reload);
}


// Now that we have changes completed we need to export our file so gulp know what it needs to call and in what order
exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;
exports.imgmin = imgmin;



// Finally we run one task (still with a variable that lets gulp know that we should run theses function)
const build = gulp.parallel(watch);
gulp.task('default', build);