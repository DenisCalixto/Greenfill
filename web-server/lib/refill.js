var mysql = require('mysql');

var connection = require('../lib/db');

const saveItemRefill = (refillId, productCategoryId, quantity) => {
    query = 'INSERT INTO `refillitem` (RefillId, ProductCategoryId, Quantity)' +
            'Values (' + refillId + ',' + productCategoryId + ',' + quantity + ')';
    connection.query(query, function(err, result) {
        if (err) {
            throw err
        }
    })
}

const extractCategoryAmount = (field) => {
    if (field)
        if (parseInt(field) > 0)
            return parseInt(field);
    return undefined;
}

module.exports = {
    saveItemRefill, 
    extractCategoryAmount
}