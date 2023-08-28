const users = require('./userRouter');
const properties = require('./propertyRouter');
const countries = require('./countryRouter');
const transactions = require('./transactionRouter');
const categories = require('./categoryRouter');
const facilities = require('./facilityRouter');
const prices = require('./priceRouter');
const rooms = require('./roomRouter');

module.exports = {
    users,
    properties,
    countries,
    transactions,
    categories,
    facilities,
    prices,
    rooms
}