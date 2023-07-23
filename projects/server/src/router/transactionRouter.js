const express = require('express');
const Router = express.Router();

const { transactions } = require('../controller');

Router.get('/user/:id', transactions.getTransaction);

Router.post('/', transactions.createTransaction);

module.exports = Router;