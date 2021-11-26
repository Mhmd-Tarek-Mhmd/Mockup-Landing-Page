const gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify");

// HTML Tasks
gulp.task("html", () =>
  gulp.src("pug/index.pug").pipe(pug()).pipe(gulp.dest("dist"))
);

// CSS Tasks
gulp.task("css", () =>
  gulp
    .src("scss/index.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest("dist/css"))
);

// JS Tasks
gulp.task("js", () =>
  gulp
    .src("js/*.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("pug/layouts"))
);

// Watch All Tasks
gulp.task("default", () => {
  gulp.watch("pug/**/*.pug", gulp.series("html"));
  gulp.watch("scss/**/*.scss", gulp.series("css"));
  gulp.watch("js/*.js", gulp.series("js"));
});
