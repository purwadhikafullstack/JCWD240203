const express = require('express');
const Router = express.Router();

const { transactionsGET, transactionsPOST, transactionsPATCH } = require('../controller');
const Authorization = require('../middleware/Authorization');
const upload = require('../middleware/upload');

Router.get('/user/:id', transactionsGET.getTransaction);

Router.get('/order/:id', transactionsGET.getOrder);

Router.get('/sales/:id', transactionsGET.getCompleted);

Router.post('/', transactionsPOST.createTransaction);

Router.patch('/:id', upload.uploadPaymentProof, Authorization.isCurrentUser, transactionsPATCH.updatePaymentProof);

Router.patch('/status/:id', Authorization.isCurrentUser, transactionsPATCH.updateStatus);

module.exports = Router;