const express = require('express');
const Router = express.Router();

const { transactions, transactionsPATCH } = require('../controller');
const Authorization = require('../middleware/Authorization');
const upload = require('../middleware/upload');

Router.get('/user/:id', transactions.getTransaction);

Router.post('/', transactions.createTransaction);

Router.patch('/', upload.uploadPaymentProof, Authorization.isCurrentUser, transactionsPATCH.updatePaymentProof);

module.exports = Router;