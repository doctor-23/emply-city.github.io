const { execSync } = require('child_process');
const {resolve } = require('path');
const { chdir } = require('process');
const fs = require('fs-extra');

const removeTmpDirectory = async () => {
    const tmpPath = resolve(__dirname, 'tmp');

    await fs.remove(tmpPath)
        .then(() => {
            console.log(`Директория ${tmpPath} успешно удалена.`);
        })
        .catch(err => {
            console.error(`Произошла ошибка при удалении директории ${tmpPath}:`, err);
        });
}

(async () => {
    console.log('<<<< start');
    // Получаем расположение package.json
    const packageJsonPath = resolve(__dirname, './package.json');
    const packageJson = fs.readJsonSync(packageJsonPath);
    try {

        console.log('Настройка пользователя Git...');
        execSync('git config --global user.email "devilJin95@mail.ru"');
        execSync('git config --global user.name "doctor-23"');
        console.log('Пользователь Git настроен.');

        console.log('Создание директории tmp...');
        const tmpPath = resolve(__dirname, 'tmp');
        fs.ensureDirSync(tmpPath);
        console.log(`Директория tmp создана: ${tmpPath}`);

        console.log('Переход в директорию tmp...');
        process.chdir(tmpPath);
        console.log(`Текущая директория: ${process.cwd()}`);

        console.log('Получения название проекта из package.json...');
        const projectName = packageJson.name;
        console.log(`Имя проекта: ${projectName}`);

        const gitRepoUrl = packageJson.repository.url;
        console.log('Инициализация git и добавление удаленного репозитория...');
        execSync('git init');
        execSync('git checkout -b main');
        execSync(`git remote add origin ${gitRepoUrl}`);
        console.log('Git инициализирован и удаленный репозиторий добавлен.');

        console.log('Получение изменений из удаленного репозитория...');
        execSync('git fetch origin main');
        execSync('git pull origin main');

        console.log('Поиск директории с проектом...');
        const projectDirPath = resolve(__dirname, projectName);
        console.log(`Директория с проектом: ${projectDirPath}`);

        console.log('Создание директории с проектом внутри tmp...');
        const tmpProjectPath = resolve(__dirname, `tmp/${projectName}`);
        fs.ensureDirSync(tmpProjectPath);
        console.log(`Директория с проектом внутри tmp создана: ${tmpProjectPath}`);

        console.log('Копирование содержимого директории проекта в директорию tmp...');
        fs.copySync(projectDirPath, tmpProjectPath, {overwrite: true});
        console.log(`Директория проекта успешно скопирована в: ${tmpProjectPath}`);

        console.log('Добавление файлов и папок в git...');
        execSync('git add .');

        console.log('Коммит изменений...');
        execSync(`git commit -m "Deploying ${projectName}"`);

        console.log('Отправка изменений в репозиторий...');
        execSync('git push -u origin main');
        console.log('Файлы добавлены, закоммичены и запушены в репозиторий.');

        console.log('Удаление директории tmp...');
        process.chdir(__dirname);
        await removeTmpDirectory();
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        console.log(`Ссылка на проект: ${packageJson.homepage}`);
        console.log('<<<< end');
    }
})();
