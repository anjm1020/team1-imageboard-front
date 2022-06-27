const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'https://133.186.151.164:8080/imageBoard', // 비즈니스 서버 URL 설정
            changeOrigin: true
        })
    );
};