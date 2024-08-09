const { v4: uuidv4 } = require('uuid');
const { connect, sql } = require('../config');

module.exports = class ContainerService {

    // Создание нового контейнера
    static async createContainer(containerData) {
        const pool = await connect();
        try {
            const newId = uuidv4();
            await pool.request()
                .input('id', sql.UniqueIdentifier, newId)
                .input('number', sql.Int, containerData.number)
                .input('type', sql.NVarChar(50), containerData.type)
                .input('length', sql.Decimal(10, 2), containerData.length)
                .input('width', sql.Decimal(10, 2), containerData.width)
                .input('height', sql.Decimal(10, 2), containerData.height)
                .input('weight', sql.Decimal(10, 2), containerData.weight)
                .input('is_empty', sql.Bit, containerData.is_empty)
                .input('receipt_date', sql.DateTime, new Date(containerData.receipt_date))
                .query(`
                    INSERT INTO containers (
                        id, number, type, length, width, height, weight, is_empty, receipt_date
                    ) VALUES (
                        @id, @number, @type, @length, @width, @height, @weight, @is_empty, @receipt_date
                    )
                `);
                return { id: newId, ...containerData };
        } catch (err) {
            console.error(`[SQL]:[ContainerService.createContainer] => `, err);
            throw err;
        } finally {
            await pool.close();
        }
    }

    // Извлечение всех данных по контейнерам в формате JSON
    static async getAllContainersData() {
        const pool = await connect();
        try {
            let result = await pool.request()
                .query(`
                    DECLARE @json_result NVARCHAR(MAX) = '[';

                    SELECT @json_result += 
                        '{' +
                        '"id": "' + CONVERT(NVARCHAR(36), id) + '",' +
                        '"number": ' + CONVERT(NVARCHAR(10), number) + ',' +
                        '"type": "' + type + '",' +
                        '"length": ' + CONVERT(NVARCHAR(10), length) + ',' +
                        '"width": ' + CONVERT(NVARCHAR(10), width) + ',' +
                        '"height": ' + CONVERT(NVARCHAR(10), height) + ',' +
                        '"weight": ' + CONVERT(NVARCHAR(10), weight) + ',' +
                        '"is_empty": ' + CONVERT(NVARCHAR(1), is_empty) + ',' +
                        '"receipt_date": "' + CONVERT(NVARCHAR(20), receipt_date, 120) + '"' +
                        '},'
                    FROM containers;
                    
                    SET @json_result = LEFT(@json_result, LEN(@json_result) - 1) + ']';
                    SELECT @json_result AS json_result;
                `);
            return result.recordset[0].json_result;
        } catch (err) {
            console.error(`[SQL]:[ContainerService.getAllContainersData] => `, err);
            throw err;
        } finally {
            await pool.close();
        }
    }
}