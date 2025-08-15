const {resolve} = require('path');
const fs = require('fs-extra');
const packageJsonPath = resolve(__dirname, './../package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const prod = `./${packageJson.name}`;
const app = './app';

const bs = require('browser-sync');

module.exports = function browserSync() {
    bs.init({
        server: {
            baseDir: prod,
            index: 'index.html',
        },
        host: '192.168.0.43',
        online: true,
        external: false,
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware("*", function (req, res) {
                    res.writeHead(302, {
                        location: "404.html"
                    });
                    res.end("Redirecting!");
                });
            }
        },
        browser: 'firefox',
        logPrefix: 'BS-HTML:',
        logLevel: 'info',
        logConnections: true,
        logFileChanges: true,
        open: false,
        https: true
    })
}
