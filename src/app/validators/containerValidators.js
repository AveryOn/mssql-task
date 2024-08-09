const { validateBoolean, validateNumber, validateString } = require('./generalValidators');

// 
/**
 * @description  Валидация полей тела запроса при создании нового контейнера
 * @param {*} body - объект который содержит поля необходимые для создания контейнера в Базе Данных
 * @description Его содержимое:
 * @param {*} type [string] - Тип контейнера
 * @param {*} length [number] - Длина контейнера
 * @param {*} number [number] - Номер контейнера
 * @param {*} width [number] - Ширина контейнера
 * @param {*} height [number] - Высотка контейнера
 * @param {*} weight [number] - Вес контейнера
 * @param {*} is_empty [boolean] - Пустой / Не пустой
 * @param {*} receipt_date [number] - Дата поступления
 * @returns // возращает проверенный объект данных с теми же ключами, но немного корректирует числовые типы данных приводя их к типу number если они пришли типа string
 * @example 
 * { 
 *      type: 'text', 
 *      length: 5436, 
 *      number: 42, 
 *      width: 2567,
 *      height: 2245,
 *      weight: 335,
 *      is_empty: true,
 *      receipt_date: 1724269898739,
 * }
 */
function validateContainerBody(body) {
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
            validateNumber('length', fields.length);
            fields.length = +fields.length
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('number', fields.number);
            fields.number = +fields.number
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('width', fields.width);
            fields.width = +fields.width
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('weight', fields.weight);
            fields.weight = +fields.weight
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('height', fields.height);
            fields.height = +fields.height
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateBoolean('is_empty', fields.is_empty);
        } catch (err) {
            errorsList.push(err);
        }
        try {
            validateNumber('receipt_date', fields.receipt_date);
            fields.receipt_date = +fields.receipt_date
        } catch (err) {
            errorsList.push(err);
        }
        if(errorsList.length) throw { messages: errorsList, status: 422 }
        return fields;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    validateContainerBody,
}

