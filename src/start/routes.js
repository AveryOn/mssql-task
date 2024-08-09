const ContainerController = require('../app/controllers/containerController');
const OperationsController = require('../app/controllers/operationsController');

module.exports = [
    // Маршруты для контейнеров
    { path: '/containers/create', method: 'POST', handler: ContainerController.create },             // Создание нового контейнера
    { path: '/containers/all', method: 'GET', handler: ContainerController.getAllContainersData },   // Извлечение всех контейнеров

    // Маршруты для операций
    { path: '/container/:container_id/operations/create', method: 'POST', handler: OperationsController.create },             // Создание новой операции
    { path: '/container/:container_id/operations/', method: 'GET', handler: OperationsController.getOperationsDataByContainerID },  // Извлечение операций по ID их контейнера
]

