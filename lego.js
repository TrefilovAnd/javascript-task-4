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
    var selectFunctions = constructors.filter(function (constructor) {
        return constructor.name === CONSTRUCTOR_PROCEDURE[i];
    })(copyCollection);

    copyCollection = constructors.filter(function (constructor) {
        return constructor.name === CONSTRUCTOR_PROCEDURE[0];
    })[0](copyCollection);
    performFunc(1);
    performSelectFunc(selectFunctions, copyCollection);
    performFunc(3);
    performFunc(4);

    return collection;
};

function performFunc(funcs, index, collection) {
    funcs.filter(function (constructor) {
        return constructor.name === CONSTRUCTOR_PROCEDURE[index];
    })[0](collection);
}

function performSelectFunc(functions, collections) {

}

/**
 * Выбор полей
 * @params {...String}
 */
exports.select = function () {
    var fields = [].slice.call(arguments);
    var selectedFields = [];

    return function select(collection) {
        fields.forEach(function (field) {
            if (collection[0].hasOwnProperty(field)) {
                selectedFields.push(field);
            }
        });

        return collection.map(function (friend) {
            var selectedFriend = {};
            selectedFields.forEach(function (field) {
                selectedFriend[field] = friend[field]
            });

            return selectedFriend;
        });
    };
};

/**
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 */
exports.filterIn = function (property, values) {
    console.info(property, values);
    var filterValues = [].concat(values);

    return function filterIn(collection) {
        if (collection[0].hasOwnProperty(property)) {
            return filterResult(collection, property, filterValues);
        }
    };
};

/**
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 */
exports.sortBy = function (property, order) {
    console.info(property, order);

    return function sortBy(collection) {
        if (collection[0].hasOwnProperty(property)) {
            if (order === 'asc') {
                collection.sort(function (a, b) {
                    return a[property] - b[property];
                });
            } else {
                collection.sort(function (a, b) {
                    return b[property] - a[property];
                });
            }
        }
    };
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
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
    };
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 */
exports.limit = function (count) {
    console.info(count);

    return function limit(collection) {
        collection.splice(count);
    };
};

function filterResult(collection, prop, values) {
    var filterResult = [];

    collection.forEach(function (friend) {
        values.forEach(function (value) {
            if (friend[prop] === value) {
                return filterResult.push(friend);
            }
        })
    });

    return filterResult;
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
