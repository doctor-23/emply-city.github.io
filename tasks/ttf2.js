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

const path = {
    src: {
        fonts: `${app}/fonts/**/*.ttf`,
    },
    build: {
        fonts: `${prod}/fonts/`
    }
}

const changed = require('gulp-changed');
const ttf2woff2 = require('gulp-ttftowoff2');

module.exports = function ttf(done) {
    return src(path.src.fonts)
        .pipe(changed(path.build.fonts, {
            extension: '.woff2',
            hasChanged: changed.compareLastModifiedTime
        }))
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
    done();
}
