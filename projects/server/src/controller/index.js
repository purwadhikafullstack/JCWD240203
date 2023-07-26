const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const usersPATCH = require('./userControllerPATCH');
const properties = require('./propertyController');
const countries = require('./countryController');
const transactionsGET = require('./transactionControllerGET');
const transactionsPOST = require('./transactionControllerPOST');
const transactionsPATCH = require('./transactionControllerPATCH');

module.exports = {
    usersPOST,
    usersGET,
    usersPATCH,
    properties,
    countries,
    transactionsGET,
    transactionsPOST,
    transactionsPATCH
}