const { validateContainerBody } = require('../validators/containerValidators');
const ContainerService = require('../../database/services/containerService');

// Контроллер обрабатывает эндпоинты сущности Контейнер
module.exports = class ContainerController {
    // Создание нового контейнера
    static async create({ request, response }) {
        try {
            // Валидация тела запроса
            const valideData = validateContainerBody(request.body);
            const newContaner = await ContainerService.createContainer(valideData);
            response.send({ data: newContaner });
        } catch (err) {
            console.error(`[ContainerController.create] => `, err);
            response.send(err).status(err?.status);
            throw err;
        }
    }

    // Извлечение данных всех контейнеров
    static async getAllContainersData({ request, response }) {
        try {
            const stringContainers = await ContainerService.getAllContainersData();
            const containers = JSON.parse(stringContainers);
            response.send({ data: containers });
        } catch (err) {
            console.error(`[ContainerController.getAllContainersData] => `, err);
            response.send(err).status(err?.status);
            throw err;
        }
    }
}