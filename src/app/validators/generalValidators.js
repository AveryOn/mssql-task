module.exports = {

    /**
     * @description Валидация строковых значений
     * @param {*} key [string] - Ключ тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} value [string] - Значение тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} isPathParam [boolean] - Флаг, указывает на то является ли проверяемое значение параметром пути
     * @returns [boolean] - при успешно пройденных проверках возвращает true, иначе поднимает исключение 
     * @example // Пример объекта, который выбрасывает блок catch:
     *  { container_id: 'значение ключа "container_id" должно быть типа string'  }
     */
    validateString(key, value, isPathParam = false) {
        let label = isPathParam? 'параметра пути' : 'ключа';
        if(value) {
            if(typeof value === 'string') {
                return true;
            } else {
                throw { [`${key}`]: `значение ${label} "${key}" должно быть типа string` };
            }
        } else {
            throw { [`${key}`]: `значение ${label} "${key}" не может быть пустым` };
        }
    },

    /**
     * @description Валидация числовых значений
     * @param {*} key [string] - Ключ тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} value [number] - Значение тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} isPathParam [boolean] - Флаг, указывает на то является ли проверяемое значение параметром пути
     * @returns [boolean] - при успешно пройденных проверках возвращает true, иначе поднимает исключение 
     * @example // Пример объекта, который выбрасывает блок catch:
     *  { start_date: 'значение ключа "start_date" должно быть типа number'  }
     */
    validateNumber(key, value, isPathParam = false) {
        try {
            let label = isPathParam? 'параметра пути' : 'ключа';
            if(value) {
                if(+value === +value) {
                    return true;
                } else {
                    throw { [`${key}`]: `значение ${label} "${key}" должно быть типом number` };
                }
            } else {
                throw { [`${key}`]: `значение ${label} "${key}" не может быть пустым` }
            }
        } catch (err) {
            throw err;
        }
    }, 
    
    /**
     * @description  Валидация булевых значений
     * @param {*} key [string] - Ключ тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} value [boolean] - Значение тела запроса (или параметра пути, если указан параметр isPathParam)
     * @param {*} isPathParam [boolean] - Флаг, указывает на то является ли проверяемое значение параметром пути
     * @returns [boolean] - при успешно пройденных проверках возвращает true, иначе поднимает исключение 
     * @example // Пример объекта, который выбрасывает блок catch:
     *  { is_empty: 'значение ключа "start_date" должно быть типа boolean'  }
     */
    validateBoolean(key, value, isPathParam = false) {
        try {
            let label = isPathParam? 'параметра пути' : 'ключа';
            if(value !== undefined && value !== null) {
                if(typeof value === 'boolean') {
                    return true;
                } else {
                    throw { [`${key}`]: `значение ${label} "${key}" должно быть типом boolean` };
                }
            } else {
                throw { [`${key}`]: `значение ${label} "${key}" не может быть пустым` }
            }
        } catch (err) {
            throw err;
        }
    }
}