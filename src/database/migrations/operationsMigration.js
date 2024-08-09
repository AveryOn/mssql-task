const { connect } = require('../config');

// Создание таблицы Контейнер
async function createOperationsTable() {
    try {
        const pool = await connect();
        return pool.request().query(`
            CREATE TABLE operations (
                id UNIQUEIDENTIFIER PRIMARY KEY,
                container_id UNIQUEIDENTIFIER,
                start_date DATETIME,
                end_date DATETIME,
                type NVARCHAR(100),
                operator_fullname NVARCHAR(255),
                inspection_place NVARCHAR(255),
                FOREIGN KEY (container_id) REFERENCES containers(id)
            );
        `)
    } catch (err) {
        console.error(__filename + ` :: ${createOperationsTable.name}  => `, err);
        throw err;
    }
}

module.exports = {
    createOperationsTable,
}
