const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const usersPATCH = require('./userControllerPATCH');
const usersPATCH2 = require('./userControllerPATCH2');
const propertiesGET = require('./propertyControllerGET');
const propertiesGET2 = require('./propertyControllerGET2');
const propertiesGET3 = require('./propertyControllerGET3');
const propertiesPOST = require('./propertyControllerPOST');
const propertiesPATCH = require('./propertyControllerPATCH');
const propertiesPATCH2 = require('./propertyControllerPATCH2');
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
    usersPATCH2,
    propertiesGET,
    propertiesGET2,
    propertiesGET3,
    propertiesPOST,
    propertiesPATCH,
    propertiesPATCH2,
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