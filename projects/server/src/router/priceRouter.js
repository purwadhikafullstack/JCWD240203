const express = require('express');
const { prices } = require('../controller');

const router = express.Router();

router.post('/', prices.createPrice);

module.exports = router;