const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const include = require('gulp-file-include');
const bs = require('browser-sync');
const path = require('path');
const dataDir = path.resolve(__dirname, '../app/src/content');
const outputFilePath = path.resolve(dataDir, 'data.json');
const prod = `./${packageJson.name}`;
const app = './app';
const paths = {
    build: {
        html: `${prod}/`
    },
    src: {
        html: [`${app}/**/*.html`, `!${app}/**/_*.html`]
    }
}

// Функция для чтения всех JSON файлов из папки и их объединения
function combineJsonFiles() {
    clearJsonFile(outputFilePath);  // Очистить файл перед записью новых данных

    const files = fs.readdirSync(dataDir);
    const combinedData = files.reduce((acc, file) => {
        if (path.extname(file) === '.json') {
            const fileName = path.basename(file, '.json');
            if (fileName !== 'data') {
                const filePath = path.join(dataDir, file);
                const fileData = fs.readJsonSync(filePath);
                acc[fileName] = fileData;
            }
        }
        return acc;
    }, {});
    fs.writeJsonSync(outputFilePath, combinedData, { spaces: 2 });
    console.log(`JSON data combined and written to ${outputFilePath}`);
    return combinedData;
}

// Функция для очистки файла
function clearJsonFile(filePath) {
    fs.writeJsonSync(filePath, {});
}

const {
    src,
    dest
} = require('gulp');

module.exports = function html() {
    const data = combineJsonFiles();

    return src(paths.src.html)
        .pipe(include({
            context: {
                data: JSON.stringify(data, null, 2), // Преобразуем JSON объект в строку
                ...data // Передаем каждый файл JSON как отдельное поле контекста
            },
            prefix: '@@',
            basepath: '@file',
            indent: true // Для сохранения отступов
        }))
        .pipe(dest(paths.build.html))
        .pipe(bs.stream())
}
