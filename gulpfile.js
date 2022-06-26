const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const del = require("del");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

const htmlInclude = () => {
  return src(["app/html/*.html"])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(
      scss({
        outputStyle: "compressed",
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    'node_modules/inputmask/dist/inputmask.js',
    "node_modules/swiper/swiper-bundle.js",
    "node_modules/baguettebox.js/dist/baguetteBox.js",
    "node_modules/aos/dist/aos.js", 
    "app/js/main.js"
])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function svgSprites() {
  return src("app/images/icons/*.svg")
    .pipe(
      cheerio({
        run: ($) => {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function fonts() {
  src(["app/fonts/*.ttf"]).pipe(ttf2woff()).pipe(dest("app/fonts"));
  return src(["app/fonts/*.ttf"]).pipe(ttf2woff2()).pipe(dest("app/fonts"));
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
  watch(["app/images/icons/*.svg"], svgSprites);
  watch(["app/html/**/*.html"], htmlInclude);
  watch(["app/scss/**/*.scss"]).on("change", browserSync.reload);
}

exports.fonts = fonts;
exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.svgSprites = svgSprites;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(
  styles,
  svgSprites,
  scripts,
  htmlInclude,
  browsersync,
  fonts,
  watching
);
