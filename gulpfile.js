// require modules
const gulp = require("gulp"),
      sass = require("gulp-sass"),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require("gulp-rename"),
      concat = require("gulp-concat"),
      eslint = require('gulp-eslint'),
      php = require('gulp-connect-php'),
      cssbeautify = require('gulp-cssbeautify'),
      browserSync = require("browser-sync").create(),
      clean = require('del'),
      // gulpconfig.js - main configurations set for directories & explicit file paths
      CONFIG = require("./gulpconfig.js");

gulp.task('clean', () => {
  return clean(CONFIG.dir.deploy);
});

gulp.task('lint', function() {
  return gulp.src([CONFIG.dir.js])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint({fix: true}))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    .pipe(
      gulp.dest(function (file) {
        return file.base;
      })
    )
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task("scss", function () {
  return gulp.src(CONFIG.dir.dev + "scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cssbeautify())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(rename("main.css"))
    .pipe(gulp.dest(CONFIG.dir.deploy + "css/"))
});
gulp.task("scss:watch", function () {
  gulp.watch(CONFIG.dir.dev + "scss/**/*.scss", gulp.series("scss"));
});

gulp.task("resources", function() {
  return gulp.src(CONFIG.dir.dev + "resources/**/*")
    .pipe(gulp.dest(CONFIG.dir.deploy + "resources/"))
});
gulp.task("resources:watch", function() {
  gulp.watch(CONFIG.dir.dev + "resources/**/*", gulp.series("resources"));
});

gulp.task("js", function() {
  return gulp.src(CONFIG.files.js)
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.dir.deploy));
});
gulp.task("js:watch", function() {
  gulp.watch(CONFIG.dir.dev + "js/**/**/*.js", gulp.series("js"));
});

gulp.task("build", gulp.parallel(
  "resources",
  "scss",
  "js"
));

gulp.task("watch", gulp.parallel(
  "resources:watch",
  "scss:watch",
  "js:watch"
));

gulp.task("php", function(){
  php.server({base: CONFIG.dir.deploy, port:8000, keepalive:true});
});
gulp.task("serve", function() {
  browserSync.init({
    proxy:"localhost:8000",
    baseDir: CONFIG.dir.deploy,
    open:true,
    notify:false
  });
  gulp.watch(CONFIG.dir.deploy + "**/*").on("change", browserSync.reload);
});

// DEFAULT GULP TASK - start the tasks BUILD & SERVE & WATCH in a series when the default gulp task is triggered
gulp.task("default", gulp.series(
  gulp.series([
    'clean',
    "lint",
    "build",
  ]),
  gulp.parallel([
    "watch",
    "php",
    "serve"
  ])
));
