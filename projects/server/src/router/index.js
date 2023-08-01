const users = require('./userRouter');
const properties = require('./propertyRouter');
const countries = require('./countryRouter');
const transactions = require('./transactionRouter');
const categories = require('./categoryRouter');
const facilities = require('./facilityController');

module.exports = {
    users,
    properties,
    countries,
    transactions,
    categories,
    facilities
}