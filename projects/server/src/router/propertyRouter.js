const express = require('express');
const { properties } = require('../controller');

const Router = express.Router();

Router.get('/', properties.getProperty);

Router.get('/:id', properties.propertyDetailed);

module.exports = Router;