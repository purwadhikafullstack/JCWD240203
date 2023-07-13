const express = require('express');
const { properties } = require('../controller');

const Router = express.Router();

Router.get('/', properties.getProperty);

module.exports = Router;