const express = require('express');
const Router = express.Router();

const { transactions, transactionsPATCH } = require('../controller');
const Authorization = require('../middleware/Authorization');
const upload = require('../middleware/upload');

Router.get('/user/:id', transactions.getTransaction);

Router.get('/order/:id', transactions.getOrder);

Router.post('/', transactions.createTransaction);

Router.patch('/:id', upload.uploadPaymentProof, Authorization.isCurrentUser, transactionsPATCH.updatePaymentProof);

Router.patch('/status/:id', Authorization.isCurrentUser, transactionsPATCH.updateStatus);

module.exports = Router;