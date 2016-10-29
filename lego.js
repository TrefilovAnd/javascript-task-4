'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

/**
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */
exports.query = function (collection) {
    var copyCollection = collection.slice();
    var constructors = [].slice.call(arguments, 1);
    console.log(constructors[1](copyCollection));
    //console.log('-->' + constructors);

    return collection;
};

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
    //console.info(property, values);
    var filterValues = [].concat(values);

    return function (collection) {
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
    //console.info(property, order);

    return;
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 */
exports.format = function (property, formatter) {
    //console.info(property, formatter);

    return;
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 */
exports.limit = function (count) {
    //console.info(count);

    return;
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
