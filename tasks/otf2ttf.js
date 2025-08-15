const app = './app';

const {
    src,
    dest,
} = require('gulp');

const fonter = require("gulp-fonter");

module.exports =  function otf2ttf() {
    return src(`${app}/fonts/*.otf`)
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(`${app}/fonts/`));
}