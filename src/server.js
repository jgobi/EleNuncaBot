const {readFileSync} = require('fs');

module.exports = function server (port) {
    return require('http').createServer(function (req, res) {
        let file;
        if (req.url.split('#')[0].split('?')[0] === '/login') {
            file = readFileSync('../web/login.html');
        } else {
            file = readFileSync('../web/index.html');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(file);
    }).listen(port);
};