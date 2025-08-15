const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

exports.libs_style = tasks.libs_style;
exports.fonts = tasks.fonts;
exports.style = tasks.style;
exports.build_js = tasks.build_js;
exports.libs_js = tasks.libs_js;
exports.html = tasks.html;
exports.rastr = tasks.rastr;
exports.svg_sprite = tasks.svg_sprite;
exports.ttf = tasks.ttf;
exports.ttf2 = tasks.ttf2;
exports.otf2ttf = tasks.otf2ttf;
exports.bs_html = tasks.bs_html;
exports.watch = tasks.watch;
exports.clean = tasks.clean;

exports.default = gulp.parallel(
    exports.bs_html,
    exports.style,
    exports.build_js,
    exports.html,
    exports.ttf,
    exports.ttf2,
    exports.fonts,
    exports.libs_style,
    exports.libs_js,
    exports.svg_sprite,
    exports.rastr,
    exports.watch
);

// Добавление команды gulp build
exports.build = gulp.series(
    exports.clean,
    gulp.parallel(
        exports.style,
        exports.build_js,
        exports.html,
        exports.ttf,
        exports.ttf2,
        exports.libs_style,
        exports.libs_js,
        exports.svg_sprite,
        exports.rastr
    )
);
