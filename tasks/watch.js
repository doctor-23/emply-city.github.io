const app = './app';

const {
    parallel,
    series,
    watch
} = require('gulp');

const watchExpress = (path, privateTask) => {
    watch(path, {usePolling: true}, privateTask);
}

const path = {
    html: `${app}/**/*.html`,
    php: `${app}/**/*.php`,
    scss: `${app}/**/*.scss`,
    js: `${app}/**/*.js`,
    json: [`${app}/**/*.json`, `!${app}/**/data.json`],
    svg_icons: `${app}/img/**/*.+(svg|ico)`,
    img: `${app}/img/**/*.+(png|jpg|jpeg|gif)`,
    svg: `${app}/img/icons/*.svg`,
    fonts: `${app}/fonts/**/*.ttf`,
}

module.exports = function watching() {
    watchExpress(path.html, parallel('html'));
    watchExpress(path.scss, parallel('style'));
    watchExpress(path.json, parallel('html'));
    // watchExpress(path.js, parallel('build_js', 'build_js_other'));
    watchExpress(path.js, parallel('build_js'));
    watchExpress(path.svg_icons, parallel('rastr'));
    watchExpress(path.img, series('rastr'));
    watchExpress(path.svg, series('svg_sprite', 'rastr'));
    watchExpress(path.fonts, series('ttf', 'ttf2', 'fonts'));
}
