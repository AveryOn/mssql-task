const { validateOperationBody, validateGetOperation } = require('../validators/operationValidators');
const OperationService = require('../../database/services/operationService');

// Контроллер обрабатывает эндпоинты сущности Операция
module.exports = class OperationsController {
    // Создание новой операции
    static async create({ request, response }) {
        try {
            // Валидация тела запроса
            const valideData = validateOperationBody({...request.body, ...request.params});
            console.log(valideData);
            const newOperation = await OperationService.createOperation(valideData);
            response.send({ data: newOperation });
        } catch (err) {
            console.error(`[OperationsController.create] => `, err);
            response.send(err).status(err?.status);
            throw err;
        }
    }

    // Извлечение операций по ID контейнеру, к которым они принадлежат
    static async getOperationsDataByContainerID({ request, response }) {
        try {
            // Валидация тела запроса
            const valideData = validateGetOperation(request.params);
            const stringOperations = await OperationService.getAllOperationDataByContainerId(valideData.container_id);
            const operations = JSON.parse(stringOperations);
            response.send({ data: operations });
        } catch (err) {
            console.error(`[OperationsController.getOperationsDataByContainerID] => `, err);
            response.send(err).status(err?.status);
            throw err;
        }
    }
}