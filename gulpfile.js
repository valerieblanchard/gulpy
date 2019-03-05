/**
 * Load gulp plugins and give them semantic names.
 */
var gulp = require('gulp'); // Gulp the first one !

// Utility plugins
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload; // Manual reload for task watch.
var sourcemaps   = require('gulp-sourcemaps'); // Keep track of sass source files when css is displayed.
var rename       = require('gulp-rename'); // Rename the files.
var lec          = require('gulp-line-ending-corrector'); // Fix different carriage returns between Windows and MAC/linux.
var filter       = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.

// CSS plugins
var sass         = require('gulp-sass'); // Convert SCSS to CSS.
var autoprefixer = require('gulp-autoprefixer'); // Add vendor prefix.
var cleanCSS     = require ('gulp-clean-css'); // Minify CSS.

// JS plugins
var concat       = require('gulp-concat'); // JS Concatenation.
var uglify       = require('gulp-uglify'); // JS Minify.

// Images plugins
var imagemin     = require('gulp-imagemin'); // Image optimization.

// WP POT
var wpPot        = require('gulp-wp-pot'); // Get_text String Translation.
var sort         = require('gulp-sort'); //

// Browsers you care about for autoprefixing.
// Browserlist https        ://github.com/ai/browserslist
var AUTOPREFIXER_BROWSERS = [
  'last 2 versions'
];

/**
 * Informations about Globbing : exemples
 */
// Pattern [*.scss]: Search for .scss in the current directory.
// Pattern [**/*.scss]: Search for .scss in the current directory even the childs.
// Pattern [!not-me.scss]: Exclude the not-me.scss from match.
// Pattern [*.+(scss|sass)]: Match multiple patterns.

// Task 'style' : Transform SCSS to CSS, Minify CSS, Add Sourcemaps, Correct Line ending
//============================================================================
gulp.task('style', function () {
  // Path to main.scss file ('gulp').
  return gulp.src( './src/assets/sass/main.scss' )
  // Initialize the sourcemap ('gulp-sourcemaps').
  .pipe( sourcemaps.init() )
  // Compile SASS to CSS ('gulp-sass').
  .pipe(sass({
    outputStyle: 'expanded',
    //outputStyle: 'compressed',
    //outputStyle: 'nested',
    //outputStyle: 'compact',
    //indentType: 'tab',
    //indentWidth: '2'
  }).on('error', sass.logError))
  // Add vendor prefixes ('gulp-autoprefixer').
  .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
  // Write the sourcemap for main.css('gulp-sourcemaps').
  .pipe( sourcemaps.write('./') )
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed to folder css ('gulp').
  .pipe( gulp.dest( './assets/css/' ) )
  // Reloads browser if main.css is enqueued ('browser-sync')
  .pipe( browserSync.stream() )

  // Minify the expanded main.css
  // Filtering stream to only css files (not the map !) = Search for .css in the current directory.
  .pipe( filter( '**/*.css' ) )
  // Minify css ('gulp-clean-css').
  .pipe(cleanCSS())
  // Rename with .min ('gulp-rename').
  .pipe(rename({
    suffix: '.min'
  }))
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed to folder css ('gulp').
  .pipe( gulp.dest( './assets/css/' ) )
  // Reloads browser if main.min.css is enqueued ('browser-sync')
  .pipe(browserSync.stream());
});

// Task 'style-editor' : Transform SCSS to CSS, Correct Line ending
//============================================================================
gulp.task('style-editor', function () {
  // Path to style-editor.scss file ('gulp').
  return gulp.src( './src/assets/sass/style-editor.scss' )
  // Compile SASS to CSS ('gulp-sass').
  .pipe(sass({
    outputStyle: 'expanded',
    //outputStyle: 'compressed',
    //outputStyle: 'nested',
    //outputStyle: 'compact',
    //indentType: 'tab',
    //indentWidth: '2'
  }).on('error', sass.logError))
  // Add vendor prefixes ('gulp-autoprefixer').
  .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed to folder css ('gulp').
  .pipe( gulp.dest( './assets/css/' ) );
});

// TASK 'images' : Minifies PNG, JPEG, GIF and SVG images.
//============================================================================
gulp.task( 'images', function() {
  return gulp.src( './src/assets/img/**/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( {
          progressive: true,
          optimizationLevel: 3, // 0-7 low-high
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}]
        } ) )
    .pipe(gulp.dest( './assets/img/' ));
});

// Task: 'js'
//============================================================================
// Task js concat and minify appcustom which goes in footer
gulp.task( 'appcustomJS', function() {
  // Path to custom js source files ('gulp').
  return gulp.src( './src/assets/js/appcustom/*.js' )
  // Concat JS with name you choose ('gulp-concat').
  .pipe( concat( 'appcustom.js' ) )
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed js to folder ('gulp')
  .pipe( gulp.dest( './assets/js/' ) )
  // Rename with .min ('gulp-rename').
  .pipe( rename( {
    suffix: '.min'
  }))
  // Minify appcustom.js ('gulp-uglify').
  .pipe( uglify() )
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed js to folder ('gulp')
  .pipe( gulp.dest( './assets/js/' ) );
 });

// Task js minify other js files
gulp.task( 'addotherJS', function() {
  // Path to other js source files ('gulp').
  return gulp.src([
    './src/assets/js/condcustom/*.js',
    './src/assets/js/vendor/*.js',
  ])
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Send js to folder ('gulp')
  .pipe( gulp.dest( './assets/js/' ) )
  // Rename with .min ('gulp-rename').
  .pipe( rename( {
    suffix: '.min'
  }))
  // Minify JS ('gulp-uglify').
  .pipe( uglify() )
  // Consistent Line Endings for non UNIX systems ('gulp-line-ending-corrector')
  .pipe( lec() )
  // Save the processed js to folder ('gulp').
  .pipe( gulp.dest( './assets/js/' ) );
});

// TASK Global 'js'
gulp.task('js', ['appcustomJS', 'addotherJS']);

// TASK BUILD : Generate the assets folder in theme.
//==================================================
gulp.task('build', ['style', 'style-editor', 'js', 'images']);

// TASK WATCH : Watch for file changes during development.
//========================================================
gulp.task('watch', function() {

  browserSync.init({
    // For more options
    // @link http://www.browsersync.io/docs/options/

    // Project URL.
    proxy: 'https://gulpy.local', // Change it for your url !!!
  });

  // When a file ending with .scss is modified (even partials), make Task 'Style' Reloading is already inside.
  gulp.watch('./src/assets/sass/**/*.scss', ['style']);
  // Reload the browser when a PHP file is modified.
  gulp.watch('./**/*.php').on('change', reload);
  // Reload the browser when an appcustom JS files is modified.
  gulp.watch( './src/assets/js/appcustom/*.js', [ 'js', reload ] );
  // Reload the browser when an condcustom JS files is modified.
  gulp.watch( './src/assets/js/condcustom/*.js', [ 'js', reload ] );
});

// Task: 'default' for development
//============================================================================
gulp.task('default', ['watch']);


// Task: 'translate' generate a .pot file with all the PHP files
//============================================================================
gulp.task( 'translate', function () {
  return gulp.src( './**/*.php' )
  // Prevent unnecessary changes in pot-file ('gulp-sort')
  .pipe(sort())
  // Generating the .pot file('gulp-wp-pot')
  .pipe(wpPot( {
    domain        : 'gulpy',
    package       : 'Gulpy',
    bugReport     : '<your contact url>',
    lastTranslator: 'YourName',
    team          : 'Team Name <your_email@email.com>'
  } ))
  .pipe(gulp.dest('./languages/gulpy.pot' ))
});

/**
 * HOW TO USE
 *
 * 1-TO BEGIN
 * In gulfile.js, change in Task Watch the Project URL. It must me yours to enable browsersync
 *
 * 2-Enable Gulp in project
 * [npm install] : Generate folder node_modules and file package-lock.json
 *
 * 3-Then make the first Gulp task
 * [gulp build] : Creates assets folder at the root of theme and add files in it
 *
 * 4-During development
 * [gulp watch] or [gulp] : During development make all stuff and reload browser
 *
 * 5-Individuals Tasks if needed
 * [gulp style] : Generates main.css and main.min.css in assets\css;
 *   By default main.css is called in functions.php to use sourcemaps, make changes if main.min.css is wanted
 *
 * [gulp style-editor] : Generates style-editor.css in assets\css;
 *
 * [gulp js] : Generates appcustom.js and appcustom.min.js in theme and minifies the other JS files.
 *   By default appcustom.min.js is called in functions.php, make changes if appcustom.js is wanted.
 *   NB : customizer.min.js is enqueued in inc/customizer.php
 *
 * [gulp translate] : Generates a .pot file to use it in Poedit
 */

