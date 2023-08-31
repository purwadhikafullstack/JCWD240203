const express = require('express');
const { prices } = require('../controller');
const Authorization = require('../middleware/Authorization');

const router = express.Router();

router.post('/', Authorization.isCurrentUser, Authorization.isHost, prices.createPrice);

module.exports = router;