const { validateNumber, validateString } = require('./generalValidators');

/**
 * @description  Валидация полей тела запроса при создании новой операции
 * @param {*} body - объект который содержит поля необходимые для создания операции в Базе Данных
 * @description Его содержимое:
 * @param {*} type [string] - Тип операции
 * @param {*} container_id [string] - ID контейнера, с которым связана данная операция
 * @param {*} start_date [number] - Дата начала операции в формате Unix Timestamp
 * @param {*} end_date [number] - Дата окончания операции в формате Unix Timestamp
 * @param {*} operator_fullname [string] - ФИО оператора
 * @param {*} inspection_place [string] - Место инспекции
 * @returns // возращает проверенный объект данных с теми же ключами, но немного корректирует числовые типы данных приводя их к типу number если они пришли типа string
 * @example 
 * { 
 *      type: 'text', 
 *      operator_fullname: 'Kyle Simpson', 
 *      inspection_place: 'New York', 
 *      container_id: 'asdf12-wsedf123-sedfg23-segf23',
 *      start_date: 1724169838739,
 *      end_date: 1724269898739
 * }
 */
function validateOperationBody(body) {
    try {
        if(!body) throw { msg: 'Пустое тело запроса', status: 422 }
        let fields = {...body};
        const errorsList = [];
        const notExistsFields = [];
        Object.entries(fields).forEach(([ key, value ]) => {
            if(value === undefined) notExistsFields.push(key);
        });
        if(notExistsFields.length) {
            throw { data: 'Заполните обязательные поля', fields: notExistsFields }
        }
        try {
            validateString('type', fields.type);
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateString('operator_fullname', fields.operator_fullname);
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateString('inspection_place', fields.inspection_place);
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateString('container_id', fields.container_id, true);
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('start_date', fields.start_date);
            fields.start_date = +fields.start_date;
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('end_date', fields.end_date);
            fields.end_date = +fields.end_date;
        } catch (err) {
            errorsList.push(err);
        }
        if(errorsList.length) throw { messages: errorsList, status: 422 }
        return fields;
    } catch (err) {
        throw err;
    }
}

// Валидация параметров запроса при извлечении операций по ID контейнера
function validateGetOperation(params) {
    try {
        if(!params) throw { msg: 'Параметры не были переданы', status: 422 }
        let fields = {...params};
        const errorsList = [];
        const notExistsFields = [];
        Object.entries(fields).forEach(([ key, value ]) => {
            if(value === undefined) notExistsFields.push(key);
        });
        try {
            validateString('container_id', fields.container_id, true);
        } catch (err) {
            errorsList.push(err);
        }
        return fields;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    validateOperationBody,
    validateGetOperation,
}

