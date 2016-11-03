'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

var OPERATORS = [
    'filterIn',
    'sortBy',
    'select',
    'format',
    'limit'
];

/**
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */
exports.query = function (collection) {
    var collectionCopy = collection.map(function (friend) {
        return Object.assign({}, friend);
    });

    Array.prototype.slice
        .call(arguments, 1)
        .sort(function (a, b) {
            return OPERATORS.indexOf(a.name) -
                OPERATORS.indexOf(b.name);
        })
        .forEach(function (func) {
            collectionCopy = func(collectionCopy);
        });

    return collectionCopy;
};

/**
 * Выбор полей
 * @params {...String}
 * @returns {Function}
 */
exports.select = function () {
    var fields = [].slice.call(arguments);

    return function select(collection) {
        return collection.map(function (isValueInArray) {
            return fields.reduce(function (accumulator, field) {
                if (isValueInArray.hasOwnProperty(field)) {
                    accumulator[field] = isValueInArray[field];
                }

                return accumulator;
            }, {});
        });
    };
};

/**
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 * @returns {Function}
 */
exports.filterIn = function (property, values) {
    console.info(property, values);

    return function filterIn(collection) {
        return collection.slice().filter(function (isValueInArray) {
            return getFilterResult(isValueInArray[property], values);
        });
    };
};

/**
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 * @returns {Function}
 */
exports.sortBy = function (property, order) {
    console.info(property, order);

    return function sortBy(collection) {
        return collection.slice().sort(function (a, b) {
            return order === 'asc'
                ? a[property] > b[property]
                : b[property] > a[property];
        });
    };
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 * @returns {Function}
 */
exports.format = function (property, formatter) {
    console.info(property, formatter);

    return function format(collection) {
        return collection.slice().map(function (isValueInArray) {
            isValueInArray[property] = formatter(isValueInArray[property]);

            return isValueInArray;
        });
    };
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 * @returns {Function}
 */
exports.limit = function (count) {
    console.info(count);

    return function limit(collection) {
        return collection.splice(0, count);
    };
};

function getFilterResult(valueOfProperty, values) {
    return values.indexOf(valueOfProperty) !== -1;
}

if (exports.isStar) {

    /**
     * Фильтрация, объединяющая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.or = function () {
        return;
    };

    /**
     * Фильтрация, пересекающая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.and = function () {
        return;
    };
}
