const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const prod = `./${packageJson.name}`;
const app = './app';

const path = {
    build: {
        css: `${prod}/css/`
    },
    src: {
        scss: [`${app}/scss/main.scss`, `${app}/components/*.scss`]
    }
}

const sass = require('gulp-sass')(require('sass'));
const bulk = require('gulp-sass-bulk-importer');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const bs = require('browser-sync');
const group_media = require("gulp-group-css-media-queries");
const rename = require('gulp-rename');
const {dest, src} = require("gulp");

module.exports = function style() {
    return src(path.src.scss)
        .pipe(map.init())
        .pipe(bulk())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(group_media())
        .pipe(prefixer({
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 11',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6',
            ],
        }))
        .pipe(concat('main.css'))
        .pipe(dest(path.build.css))
        .pipe(clean({
            level: 2
        }))
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(map.write('.'))
        .pipe(dest(path.build.css))
        .pipe(bs.stream())
}
