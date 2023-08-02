const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const usersPATCH = require('./userControllerPATCH');
const properties = require('./propertyController');
const propertiesPOST = require('./propertyControllerPOST');
const reviews = require('./reviewController');
const countries = require('./countryController');
const transactionsGET = require('./transactionControllerGET');
const transactionsGET2 = require('./transactionControllerGET2');
const transactionsPOST = require('./transactionControllerPOST');
const transactionsPATCH = require('./transactionControllerPATCH');
const categories = require('./categoryController');
const facilities = require('./facilityController');

module.exports = {
    usersPOST,
    usersGET,
    usersPATCH,
    properties,
    propertiesPOST,
    reviews,
    countries,
    transactionsGET,
    transactionsGET2,
    transactionsPOST,
    transactionsPATCH,
    categories,
    facilities
}