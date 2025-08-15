const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const prod = `./${packageJson.name}`;
const app = './app';

const {
    src,
    dest
} = require('gulp');

const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const include = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const bs = require("browser-sync");

const path = {
    build: {
        js: `${prod}/js/`
    },
    src: {
        js: [`${app}/js/*.js`, `!${app}/js/_*.js`, `!${app}/js/main.js`]
    }
}

module.exports = function build_js_other() {
    return src(path.src.js)
        .pipe(sourcemaps.init()) // Инициализация sourcemaps
        .pipe(include()) // Включение модулей
        .pipe(babel()) // Транспиляция через Babel
        .pipe(dest(path.build.js)) // Сохраняем оригинальную (не минифицированную) версию
        .pipe(uglify()) // Минификация JavaScript
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min к имени файла
        .pipe(sourcemaps.write('.')) // Запись sourcemaps
        .pipe(dest(path.build.js)) // Сохраняем минифицированную версию
        .pipe(bs.stream()); // Обновление браузера
}
