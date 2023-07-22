const users = require('./userRouter');
const properties = require('./propertyRouter');
const countries = require('./countryRouter');
const transactions = require('./transactionRouter');

module.exports = {
    users,
    properties,
    countries,
    transactions
}