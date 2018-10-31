var gulp = require("gulp");

gulp.task(
  "css-browsersync",
  gulp.series(function() {
    return gulp
      .src(["*.scss"])
      .pipe(
        sass().on("error", function(err) {
          console.error(err.message);
          browserSync.notify(err.message, 3000); // Display error in the browser
          this.emit("end"); // Prevent gulp from catching the error and exiting the watch process
        })
      )
      .pipe(gulp.dest("public/"))
      .pipe(browserSync.stream());
  })
);

gulp.task(
  "watch",
  gulp.series("css-browsersync", function() {
    browserSync.init({
      server: "./public"
    });

    gulp.watch("*.scss", ["css-browsersync"]);
    gulp.watch("public/*.html").on("change", browserSync.reload);

    // protip: stop old version of gulp watch from running when you modify the gulpfile
    gulp.watch("gulpfile.js").on("change", () => process.exit(0));
  })
);
