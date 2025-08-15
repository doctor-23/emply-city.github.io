const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const prod = `./${packageJson.name}`;
const app = './app';

const chalkPlug = require('chalk');

let srcFonts = `${app}/scss/_fonts.scss`;
let prodFonts = `${prod}/fonts/`;

module.exports = function fonts(done) {
    // Если файл уже существует и не пустой, ничего не делаем
    if (fs.existsSync(srcFonts)) {
        const stats = fs.statSync(srcFonts);
        if (stats.size > 0) {
            console.log(chalkPlug.blue(`Fonts file already exists and is not empty: ${srcFonts}`));
            return done();
        }
    }

    // Создаем начальное содержимое файла
    let fileContent = '@use "mixins";\n\n';

    // Проверяем существование директории с шрифтами
    if (!fs.existsSync(prodFonts)) {
        console.error(chalkPlug.red(`Directory ${prodFonts} does not exist`));
        return done();
    }

    // Читаем файлы шрифтов
    const items = fs.readdirSync(prodFonts);
    if (!items || items.length === 0) {
        console.log(chalkPlug.yellow('No font files found'));
        return done();
    }

    // Обрабатываем каждый файл шрифта
    let processedFonts = new Set();
    items.forEach(item => {
        const fullFontName = item.split('.')[0];
        const shortFontName = fullFontName.split('-')[0];

        if (!processedFonts.has(fullFontName)) {
            fileContent += `@include mixins.font("${shortFontName}", "${fullFontName}", "400", "normal");\n`;
            processedFonts.add(fullFontName);
        }
    });

    // Записываем результат в файл
    fs.writeFileSync(srcFonts, fileContent);
    console.log(chalkPlug.green(`Fonts file updated: ${srcFonts}`));
    done();
}