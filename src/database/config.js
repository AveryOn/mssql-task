const sql = require('mssql');

const port = process.env.DATABASE_PORT || 1433;
const host = process.env.DATABASE_HOST || 'localhost';
const username = process.env.DATABASE_USERNAME || 'sa';
const password = process.env.DATABASE_PASSWORD;
const namedb = process.env.DATABASE_NAME;

const config = {
    user: username,
    password: password,
    server: host,
    port: +port,
    database: namedb,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};
// Установка соединения с сервером БД
async function connect() {
    try {
        return await sql.connect(config);
    } catch (err) {
        console.error('[DB_CONNECTION]: Не удалось установить соединение с сервером Базы Данных =>', err);        
    }
}

module.exports = {
    sql,
    config,
    connect,
}
