const usersPOST = require('./userControllerPOST');
const usersGET = require('./userControllerGET');
const properties = require('./propertyController');
const countries = require('./countryController');

module.exports = {
    usersPOST,
    usersGET,
    properties,
    countries
}