const { v4: uuidv4 } = require('uuid');
const { connect, sql } = require('../config');

module.exports = class OperationService {
    // Создание нового контейнера
    static async createOperation(operationData) {
        const pool = await connect();
        try {
            const newId = uuidv4();
            await pool.request()
                .input('id', sql.UniqueIdentifier, newId)
                .input('container_id', sql.UniqueIdentifier, operationData.container_id)
                .input('start_date', sql.DateTime, new Date(operationData.start_date))
                .input('end_date', sql.DateTime, new Date(operationData.end_date))
                .input('type', sql.NVarChar(50), operationData.type)
                .input('operator_fullname', sql.NVarChar(100), operationData.operator_fullname)
                .input('inspection_place', sql.NVarChar(100), operationData.inspection_place)
                .query(`
                    INSERT INTO operations (id, container_id, start_date, end_date, type, operator_fullname, inspection_place)
                    VALUES (@id, @container_id, @start_date, @end_date, @type, @operator_fullname, @inspection_place)
                    SELECT SCOPE_IDENTITY() AS insertedId;
                `);
                return { id: newId, ...operationData };
        } catch (err) {
            console.error(`[SQL]:[OperationService.createOperation] => `, err);
            throw err;
        } finally {
            await pool.close();
        }
    }

     // Извлечение всех данных по операциям по ID их контейнера в формате JSON
    static async getAllOperationDataByContainerId(containerId) {
        const pool = await connect();
        try {
            const result = await pool.request()
                .input('container_id', sql.UniqueIdentifier, containerId)
                .query(`
                    DECLARE @containerID UNIQUEIDENTIFIER = @container_id;
                    DECLARE @json_result NVARCHAR(MAX) = '[';
                    
                    SELECT @json_result += 
                        '{' +
                        '"id": "' + CONVERT(NVARCHAR(36), id) + '",' +
                        '"container_id": "' + CONVERT(NVARCHAR(36), @containerID) + '",' +
                        '"start_date": "' + CONVERT(NVARCHAR(20), start_date, 120) + '",' +
                        '"end_date": "' + CONVERT(NVARCHAR(20), end_date, 120) + '",' +
                        '"type": "' + type + '",' +
                        '"operator_fullname": "' + operator_fullname + '",' +
                        '"inspection_place": "' + inspection_place + '"' +
                        '},'
                    FROM operations
                    WHERE container_id = @containerID;
                    SET @json_result = LEFT(@json_result, LEN(@json_result) - 1) + ']';
                    SELECT @json_result AS json_result;
                `);
            return result.recordset[0].json_result;
        } catch (err) {
            console.error(`[SQL]:[OperationService.createOperation] => `, err);
            throw err;
        } finally {
            await pool.close();
        }
    } 
}