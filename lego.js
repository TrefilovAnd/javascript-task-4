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

    Array.prototype.slice.call(arguments, 1)
        .sort(function (a, b) {
            return OPERATORS.indexOf(a.name) -
                OPERATORS.indexOf(b.name);
        })
        .forEach(function (operator) {
            collectionCopy = operator(collectionCopy);
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
        return collection.map(function (record) {
            return fields.reduce(function (accumulator, field) {
                if (record.hasOwnProperty(field)) {
                    accumulator[field] = record[field];
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
        return collection.filter(function (record) {
            return values.indexOf(record[property]) !== -1;
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
        var collectionCopy = collection.map(function (record) {
            return Object.assign({}, record);
        });

        return collectionCopy.sort(function (a, b) {
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
        return collection.map(function (record) {
            record[property] = formatter(record[property]);

            return record;
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
        var collectionCopy = collection.map(function (record) {
            return Object.assign({}, record);
        });

        return collectionCopy.splice(0, count);
    };
};

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
