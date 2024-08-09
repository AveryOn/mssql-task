// НАСТРОЙКА EXPRESS СЕРВЕРА ДЛЯ ПРИНЯТИЯ ВХОДЯЩИХ ЗАПРОСОВ
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
const routes = require('./routes');
const { isValidRestMethod, isValidRestPath } = require('../../src/app/validators/kernel');

// Миграции
const migrationRun = require('../database/migrations/run');


// MIDDLEWARES
const availableRestMethods = ['get', 'post', 'put', 'delete', 'patch'];
app.use(cors({ origin: '*', methods: availableRestMethods }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



( async function() {
    const availableRestMethods = ['get', 'post', 'put', 'delete', 'patch'];
    try {

        // ЗАПУСК МИГРАЦИЙ
        // await migrationRun();

        routes.forEach(({ path, method, handler }) => {
            // Блок проверок на ошибки
            if(!isValidRestMethod(method, availableRestMethods)) throw `"${method}" - не допустимый URL-метод`;
            if(!isValidRestPath(path)) throw `недопустимый формат url-пути - "${path}"`;
            if(!handler) throw `Для маршрута - "[${method}] > ${path}" не определен обработчик пути`;

            // Инициализация маршрута из списка маршрутов Если валидации прошли успешно
            app[method.toLowerCase()](path, async (request, response) => {
                try {
                    await handler({ request, response });
                } catch (err) {
                    console.error(`[${method.toUpperCase()}] => ${path} - ERROR => `, err);
                }
            });
        });
    } catch (err) {
        console.error('Ошибка при инициализации серверных маршрутов =>', );
    }
})();
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Сервер запущен http://localhost:${port}/`);
});
