// приложение Express
import express from 'express';

// конфигурация
const cfg = {
    port: process.env.PORT || 3000
};

// инициализация Express
const app = express();

// маршрут домашней страницы
app.get('/:name?', (req, res) => {
    res.send(`Hello ${ req.params.name || 'World' }!`);
});

// запуск сервера
app.listen(cfg.port, () => {
    console.log(`server listening at http://localhost:${ cfg.port }`);
});