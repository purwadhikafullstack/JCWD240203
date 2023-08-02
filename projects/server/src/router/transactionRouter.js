const express = require('express');
const Router = express.Router();

const { transactionsGET, transactionsGET2, transactionsPOST, transactionsPATCH } = require('../controller');
const Authorization = require('../middleware/Authorization');
const upload = require('../middleware/upload');

Router.get('/user/:id', transactionsGET.getTransaction);

Router.get('/order/:id', transactionsGET.getOrder);

Router.get('/sales/:id', Authorization.isOwner, transactionsGET.getCompleted);

Router.get('/current/:id', transactionsGET2.getCurrent);

Router.get('/leaving/:id', transactionsGET2.getCheckingOut);

Router.get('/upcoming/:id', transactionsGET2.getUpcoming);

Router.post('/', transactionsPOST.createTransaction);

Router.patch('/:id', upload.uploadPaymentProof, Authorization.isCurrentUser, transactionsPATCH.updatePaymentProof);

Router.patch('/status/:id', Authorization.isCurrentUser, transactionsPATCH.updateStatus);

module.exports = Router;