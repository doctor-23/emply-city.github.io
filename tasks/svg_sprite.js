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
        img: `${app}/img/icons/*.svg`
    },
    build: {
        img: `${prod}/img/icons/`
    }
}


const svgmin = require('gulp-svgmin');
const sprite = require('gulp-svg-sprite');

module.exports = function svg_sprite() {
    return src(path.src.img)
        .pipe(svgmin({
            plugins: [{
                removeComments: true
            },
                {
                    removeEmptyContainers: true
                }
            ]
        }))
        .pipe(dest(path.build.img))
        .pipe(sprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
}
