const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const usersPATCH = require('./userControllerPATCH');
const properties = require('./propertyController');
const countries = require('./countryController');
const transactions = require('./transactionController');
const transactionsPATCH = require('./transactionControllerPATCH');

module.exports = {
    usersPOST,
    usersGET,
    usersPATCH,
    properties,
    countries,
    transactions,
    transactionsPATCH
}