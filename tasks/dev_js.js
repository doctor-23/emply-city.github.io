const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const prod = `./${packageJson.name}`;
const app = 'app';

const {
    src,
    dest
} = require('gulp');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const bs = require('browser-sync');

const path = {
    build: {
        js: `${prod}/js/`
    },
    src: {
        js: [`${app}/js/01_main.js`, `${app}/components/**/*.js`]
    }
}

module.exports = function dev_js() {
    return src(path.src.js)
        .pipe(map.init())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(map.write('.'))
        .pipe(dest(path.build.js))
        .pipe(bs.stream())
}
