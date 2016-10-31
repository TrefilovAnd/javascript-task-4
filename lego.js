'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

var CONSTRUCTOR_PROCEDURE = [
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
    var copyCollection = collection.slice();
    var constructors = [].slice.call(arguments, 1);

    CONSTRUCTOR_PROCEDURE.forEach(function (funcName) {
        copyCollection = performFunc(constructors, funcName, copyCollection);
    });

    return copyCollection;
};

function performFunc(constructors, funcName, collection) {
    var functions = constructors.filter(function (constructor) {
        return constructor.name === funcName;
    });

    if (functions.length) {
        return functions.reduce(function (acc, func) {
            return func(acc, collection);
        }, collection);
    }
}

/**
 * Выбор полей
 * @params {...String}
 * @returns {Function}
 */
exports.select = function () {
    var fields = [].slice.call(arguments);

    return function select(collection) {
        return collection.map(function (friend) {
            return getSelectedFriend(friend, fields);
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
        return collection.filter(function (friend) {
            return getFilterResult(friend[property], values);
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
        if (collection[0].hasOwnProperty(property)) {
            if (order === 'asc') {
                return collection.sort(function (a, b) {
                    return a[property] - b[property];
                });
            }

            return collection.sort(function (a, b) {
                return b[property] - a[property];
            });
        }
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
        if (collection[0].hasOwnProperty(property)) {
            collection.forEach(function (friend) {
                friend[property] =
                    formatter(friend[property]);
            });
        }

        return collection;
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
        collection.splice(count);

        return collection;
    };
};

function getSelectedFriend(friend, fields) {
    var selectedFriend = {};

    fields.forEach(function (field) {
        if (friend.hasOwnProperty(field)) {
            selectedFriend[field] = friend[field];
        }
    });

    return selectedFriend;
}

function getFilterResult(valueOfProperty, values) {
    return values.indexOf(valueOfProperty) > -1;
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
