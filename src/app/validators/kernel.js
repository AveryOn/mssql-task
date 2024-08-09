
// Валидация имени URL-метода 
function isValidRestMethod(method, availableMethods) {
    try {
        let isValid = true;
        if(method && typeof method === 'string') {
            if(availableMethods && Array.isArray(availableMethods)) {
                // Если входящий в функцию метод НЕ существует в списке допустимых URL-методов то валидация не проходит
                if(!availableMethods.find((entry) => entry.toLowerCase() === method.toLowerCase())) {
                    isValid = false;
                }
            } 
            else throw 'Недопустимый формат списка URL-методов';
        } 
        // Если метода не существует либо он неверного типа то валидация не проходит
        else isValid = false;
        return isValid;
    } catch (err) {
        console.error(__filename + ` :: ${isValidRestMethod.name}  => `, err);
        throw err;
    }
}

// Валидация имени URL-пути 
function isValidRestPath(path) {
    try {
        let isValid = true;
        if(!path) isValid = false;
        if(typeof path !== 'string') isValid = false;
        if(path.at(0) !== '/') isValid = false;
        return isValid;
    } catch (err) {
        console.error(__filename + ` :: ${isValidRestPath.name}  => `, err);
        throw err;
    }
}

module.exports = {
    isValidRestMethod,
    isValidRestPath,
};
