const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const usersPATCH = require('./userControllerPATCH');
const propertiesGET = require('./propertyControllerGET');
const propertiesGET2 = require('./propertyControllerGET2');
const propertiesGET3 = require('./propertyControllerGET3');
const propertiesPOST = require('./propertyControllerPOST');
const propertiesPATCH = require('./propertyControllerPATCH');
const reviews = require('./reviewController');
const countries = require('./countryController');
const transactionsGET = require('./transactionControllerGET');
const transactionsGET2 = require('./transactionControllerGET2');
const transactionsPOST = require('./transactionControllerPOST');
const transactionsPATCH = require('./transactionControllerPATCH');
const categories = require('./categoryController');
const facilities = require('./facilityController');
const prices = require('./priceController');

module.exports = {
    usersPOST,
    usersGET,
    usersPATCH,
    propertiesGET,
    propertiesGET2,
    propertiesGET3,
    propertiesPOST,
    propertiesPATCH,
    reviews,
    countries,
    transactionsGET,
    transactionsGET2,
    transactionsPOST,
    transactionsPATCH,
    categories,
    facilities,
    prices
}