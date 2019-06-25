let mysql = require('mysql');

let connection = require('../lib/db');
const Company = require('../classes/company');

const saveCompany = (company) => {
    // query = 'INSERT INTO `refillitem` (RefillId, ProductCategoryId, Quantity)' +
    //         'Values (' + refillId + ',' + productCategoryId + ',' + quantity + ')';
    // connection.query(query, function(err, result) {
    //     if (err) {
    //         return err
    //     }
    // })
}

const saveCompanyBulkStrategies = (refillId, productCategoryId, quantity) => {
    query = 'INSERT INTO `refillitem` (RefillId, ProductCategoryId, Quantity)' +
            'Values (' + refillId + ',' + productCategoryId + ',' + quantity + ')';
    connection.query(query, function(err, result) {
        if (err) {
            return err
        }
    })
}

const saveCompanyProductCategories = (refillId, productCategoryId, quantity) => {
    query = 'INSERT INTO `refillitem` (RefillId, ProductCategoryId, Quantity)' +
            'Values (' + refillId + ',' + productCategoryId + ',' + quantity + ')';
    connection.query(query, function(err, result) {
        if (err) {
            return err
        }
    })
}


module.exports = {
    saveCompany, 
    saveCompanyBulkStrategies, 
    saveCompanyProductCategories
}