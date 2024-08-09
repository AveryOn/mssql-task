const { createContainersTable } = require('./containersMigration');
const { createOperationsTable } = require('./operationsMigration');



// Запуск миграций БД по порядку
async function migrationRun() {
    try {
        let migrations = [createContainersTable(), createOperationsTable()];
        await Promise.all([migrations]);
        console.log(`[миграции выполнены: ${migrations.length}]`);
    } catch (err) {
        console.error('[migrationRun]: Ошибка при выполнении миграций в Базе Данных => ', err);
        throw err;
    }
}

module.exports = migrationRun;