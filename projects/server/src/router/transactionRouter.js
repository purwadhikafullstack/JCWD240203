const express = require('express');
const Router = express.Router();

const { transactions } = require('../controller');

Router.post('/', transactions.createTransaction);

module.exports = Router;