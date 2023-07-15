const express = require('express');
const { countries } = require('../controller');

const Router = express.Router();

Router.get('/', countries.getCountry);

module.exports = Router;