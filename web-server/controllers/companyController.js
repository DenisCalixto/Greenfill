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

const saveCompanyBulkStrategy = (companyId, bulkStrategyId) => {
    query = 'INSERT INTO CompanyBulkStrategy (companyId, bulkStrategyId)' +
            'Values (' + companyId + ',' + bulkStrategyId + ')';
    connection.query(query, function(err, result) {
        if (err) {
            throw err
        }
    })
}

const saveCompanyProductCategory = (companyId, productCategoryId) => {
    query = 'INSERT INTO CompanyProductCategory (companyId, productCategoryId)' +
            'Values (' + companyId + ',' + productCategoryId + ')';
    connection.query(query, function(err, result) {
        if (err) {
            throw err
        }
    })
}


module.exports = {
    saveCompany, 
    saveCompanyBulkStrategy, 
    saveCompanyProductCategory
}