const express = require('express');
const { facilities } = require('../controller');

const Router = express.Router();

Router.get('/', facilities.getFacility);

module.exports = Router;