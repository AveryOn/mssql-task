const { connect } = require('../config');

// Создание таблицы Контейнер
async function createContainersTable() {
    try {
        const pool = await connect();
        return pool.request().query(`
            CREATE TABLE containers (
                id UNIQUEIDENTIFIER PRIMARY KEY,
                number INT,
                type NVARCHAR(100),
                length DECIMAL(10, 2),
                width DECIMAL(10, 2),
                height DECIMAL(10, 2),
                weight DECIMAL(10, 2),
                is_empty BIT,
                receipt_date DATETIME
            );
        `)
    } catch (err) {
        console.error(__filename + ` :: ${createContainersTable.name}  => `, err);
        throw err;
    }
}

module.exports = {
    createContainersTable,
}
