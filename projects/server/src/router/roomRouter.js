const express = require('express');
const { rooms } = require('../controller');
const router = express.Router();

router.get('/', rooms.propertyRooms);

module.exports = router;